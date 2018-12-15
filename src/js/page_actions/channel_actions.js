"use strict";

import { StoryCard } from "../components/Story/StoryCard.js";
import { getParams } from "../utils.js";
import { fetchChannelStories, fetchChannelData } from "../fetch_actions/channel_fetch_actions.js";
import { isUserLoggedIn, getUserStoryVotes } from "../store.js";
import { errorHandler } from "../ErrorHandler.js";
import { SimpleMessage } from "../components/SimpleMessage.js";
import { ChannelInfo } from "../components/ChannelInfo.js";

const channel_stories = new Map();
let loading = false;

const loadChannelTitle = async () => {
	loading = true;
	const params = getParams();
    
	if (!params.id) {
		window.location.href = "../pages/stories.php";
	}

	try {
		const channel_data = await fetchChannelData(params.id);
		populateChannelInfo(channel_data);
		return true;

	} catch (e) {
		const err = errorHandler.getError(e);
		showErrorMessage(err.msg);
		err.defaultAction();
		return false;
		
	}
};

const populateChannelInfo = (channel_data) => {
	const channel_info_container = document.getElementById("channel_info_container");
	
	const channel_info = new ChannelInfo(channel_data);
	const channel_info_elem = channel_info.render();
	channel_info_container.appendChild(channel_info_elem);
	
	loading = false;
};

const loadChannelStories = async (offset, n_stories) => {
	loading = true;
	const params = getParams();
    
	if (!params.id) {
		window.location.href = "../pages/stories.php";
	}
	
	try {
		const channel_stories_data = await fetchChannelStories(params.id, offset, n_stories);
		populateChannelStories(channel_stories_data);
	} catch (e) {
		return;
	}
	
	if (await isUserLoggedIn()) {
		const user_votes = await getUserStoryVotes();
		updateStoriesVoting(user_votes);
	}
};

const showErrorMessage = msg => {
	const container = document.getElementById("content");
    
	const simpleMessage = new SimpleMessage(msg, "", [{text: "Homepage", href:"/pages/stories.php"}]); 
	container.prepend(simpleMessage.render());
	document.getElementById("top").remove();
};


const updateStoriesVoting = user_votes => {
	//story_id, rating
	for (const user_vote of user_votes) {
		const rating = parseInt(user_vote.rating);

		const matching_top = channel_stories.get(user_vote.story_id);
		if (matching_top) {
			matching_top.setUpvoted(rating);
		}
	}
};

const populateChannelStories = (channel_stories_data) => {
	const channel_stories_container = document.getElementById("channel_stories_container");
    
	for (const channel_story_data of channel_stories_data) {
		const story = new StoryCard(channel_story_data);
		channel_stories.set(channel_story_data.story_id, story);
		const story_card = story.render();
		channel_stories_container.appendChild(story_card);
	}
	loading = false;
};

const clearUserStories = () => {
	const channel_stories_container = document.getElementById("channel_stories_container");

	while (channel_stories_container.firstChild) {
		channel_stories_container.removeChild(channel_stories_container.firstChild);
	}

	channel_stories.clear();
};

const refreshChannelStories = () => {
	clearUserStories();
	loadChannelStories(0,5);
};

const scrollListener = () => {
	if (document.getElementById("channel_stories_container") === null) return;

	if (
		document.body.scrollHeight <=
		document.documentElement.scrollTop + window.innerHeight &&
		!loading
	) {
		loadChannelStories(channel_stories.size, 5);
	}
};

document.getElementById("refresh_top_stories").addEventListener("click", refreshChannelStories);
document.addEventListener("scroll", () => scrollListener());

// Only render channel stories if channel exists
const loadPage = async () => {
	if (await loadChannelTitle()) {
		loadChannelStories(0,5);
	}
};

loadPage();