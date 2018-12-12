"use strict"

import { Story } from "../components/Story.js";
import { UserInfo } from "../components/UserInfo.js";
import { getParams } from "../utils.js";
import { fetchUserStories, fetchUserData } from "../fetch_actions/user_fetch_actions.js";
import { isUserLoggedIn, getUserStoryVotes } from "../store.js";

const user_stories = new Map();
let user_info = null;
let loading = false;

const loadUserStories = async (offset, n_stories) => {
	loading = true;
	const params = getParams();
	const user_stories_data = await fetchUserStories(params.username, offset, n_stories);
	populateUserStories(user_stories_data);

	if (await isUserLoggedIn()) {
		const user_votes = await getUserStoryVotes();
		updateStoriesVoting(user_votes);
	}
};

async function loadUserInfo() {
	const params = getParams();

	if (!params.username) {
		window.location.href = '../pages/stories.php';
	}
	const user_data = await fetchUserData(params.username);
	user_info = new UserInfo(user_data);
	populateUserInfo();
}



const updateStoriesVoting = user_votes => {
	//story_id, rating
	for (const user_vote of user_votes) {
		const rating = parseInt(user_vote.rating);

		const matching_top = user_stories.get(user_vote.story_id);
		if (matching_top) {
			matching_top.setUpvoted(rating);
		}
	}
};

const populateUserInfo = () => {
	const user_info_container = document.getElementById("user_info_container");
	user_info_container.appendChild(user_info.render());
}


const populateUserStories = (user_stories_data) => {
	const user_stories_container = document.getElementById("user_stories_container");
    
	for (const user_story_data of user_stories_data) {
		const story = new Story(user_story_data);
		user_stories.set(user_story_data.story_id, story);
		const story_card = story.renderCard();
		user_stories_container.appendChild(story_card);
	}
	loading = false;
};

const clearUserStories = () => {
	const user_stories_container = document.getElementById("user_stories_container");

	while (user_stories_container.firstChild) {
		user_stories_container.removeChild(user_stories_container.firstChild);
	}

	user_stories.clear();
};

const refreshUserStories = () => {
	clearUserStories();
	loadUserInfo();
	loadUserStories(0,5);
};

const scrollListener = () => {
	if (document.getElementById("user_stories_container") === null) return;

	if (
		document.body.scrollHeight <=
		document.documentElement.scrollTop + window.innerHeight &&
		!loading
	) {
		loadUserStories(user_stories.size, 5);
	}
};

document.getElementById("refresh_newest_stories").addEventListener("click", refreshUserStories);
document.addEventListener("scroll", () => scrollListener());

loadUserInfo();
loadUserStories(0,5);

