"use strict"

import { Story } from "../components/Story.js";
import { getParams } from "../utils.js";
import { fetchUserStories } from "../fetch_actions/user_fetch_actions.js";

const user_stories = new Map();

const loadUserStories = async () => {
	const params = getParams();
	if(!params.username) {
		window.location.href = '../pages/stories.php'
	}
	const user_stories_data = await fetchUserStories(params.username);
	populateUserStories(user_stories_data);
};

const populateUserStories = (user_stories_data) => {
	const user_stories_container = document.getElementById("user_stories_container");
    
	for (const user_story_data of user_stories_data) {
		const story = new Story(user_story_data);
		user_stories.set(user_story_data.story_id, story);
		const story_card = story.renderCard();
		user_stories_container.appendChild(story_card);
	}
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
	loadUserStories();
};

document.getElementById("refresh_newest_stories").addEventListener("click", refreshUserStories);

loadUserStories();
