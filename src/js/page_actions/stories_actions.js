"use strict";

import { Story } from "../components/Story.js";
import { fetchNewestStories, fetchTopStories } from "../fetch_actions/stories_fetch_actions.js";
import { isUserLoggedIn, getUserStoryVotes } from "../store.js";

let loading = false;
const newest_stories = new Map();
const top_stories = new Map();

const loadStories = async () => {
	loadTopStories();
	loadNewestStories(0, 5);

	if (await isUserLoggedIn()) {
		const user_votes = await getUserStoryVotes();
		updateStoriesVoting(user_votes);
	}
};

const updateStoriesVoting = user_votes => {
	//story_id, rating
	for (const user_vote of user_votes) {
		const rating = parseInt(user_vote.rating);

		const matching_top = top_stories.get(user_vote.story_id);
		if (matching_top) {
			matching_top.setUpvoted(rating);
		}

		const matching_newest = newest_stories.get(user_vote.story_id);
		if (matching_newest) {
			matching_newest.setUpvoted(rating);
		}
	}
};

const loadTopStories = async () => {
	const trending_stories_data = await fetchTopStories();
	populateTopStories(trending_stories_data);
};

const populateTopStories = (top_stories_data) => {
	const top_stories_container = document.getElementById("top_stories_container");
    
	for (const top_story_data of top_stories_data) {
		const story = new Story(top_story_data);
		top_stories.set(top_story_data.story_id, story);
		const story_card = story.renderCard();
		top_stories_container.appendChild(story_card);
	}
};

const clearTopStories = () => {
	const top_stories_container = document.getElementById("top_stories_container");

	while (top_stories_container.firstChild) {
		top_stories_container.removeChild(top_stories_container.firstChild);
	}

	top_stories.clear();
};

const loadNewestStories = async (offset, n_stories) => {
	loading = true;
	const top_stories_data = await fetchNewestStories(offset, n_stories);
	populateNewestStories(top_stories_data);
};

const populateNewestStories = (newest_stories_data) => {
	const newest_stories_container = document.getElementById("newest_stories_container");
    
	for (const newest_story_data of newest_stories_data) {
		const story = new Story(newest_story_data);
		newest_stories.set(newest_story_data.story_id, story);
		const story_card = story.renderCard();
		newest_stories_container.appendChild(story_card);
	}

	loading = false;
};

const clearNewestStories = () => {
	const newest_stories_container = document.getElementById("newest_stories_container");

	while (newest_stories_container.firstChild) {
		newest_stories_container.removeChild(newest_stories_container.firstChild);
	}

	top_stories.clear();
};

const refreshTopStories = () => {
	clearTopStories();
	loadTopStories();
};

const refreshNewestStories = () => {
	clearNewestStories();
	loadNewestStories(0, 5);
};

const scrollListener = () => {
	if (document.getElementById("newest_stories_container") === null) return;

	if (
		document.body.scrollHeight <=
		document.documentElement.scrollTop + window.innerHeight &&
		!loading
	) {
		loadNewestStories(newest_stories.size, 5);
	}
};

// This runs as the file is loaded from here down

document.getElementById("refresh_newest_stories").addEventListener("click", refreshNewestStories);
document.getElementById("refresh_top_stories").addEventListener("click", refreshTopStories);
document.addEventListener("scroll", () => scrollListener());


loadStories();