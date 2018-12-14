"use strict"

import { Story } from "../components/Story.js";
import { getParams } from "../utils.js";
import { fetchStoriesLike } from "../fetch_actions/stories_fetch_actions.js"
import { fetchUsersLike } from "../fetch_actions/user_fetch_actions.js"
import { isUserLoggedIn, getUserStoryVotes } from "../store.js";
import { UserCard } from "../components/UserCard.js";

const BASE_URL = ""

const user_results = [];
const channel_results = new Map();
const story_results = new Map();



const loadStories = async (query) => {
	loadSearchStories(query);

	if (await isUserLoggedIn()) {
		const user_votes = await getUserStoryVotes();
		updateStoriesVoting(user_votes);
	}
};

const updateStoriesVoting = user_votes => {
	//story_id, rating
	for (const user_vote of user_votes) {
		const rating = parseInt(user_vote.rating);

		const matching_top = story_results.get(user_vote.story_id);
		if (matching_top) {
			matching_top.setUpvoted(rating);
		}
	}
};

const loadSearchStories = async query => {
	const stories_data = await fetchStoriesLike(query);
	populateStories(stories_data);
};

const populateStories = (stories_data) => {
	const stories_container = document.getElementById("stories_container");
    
	for (const story_data of stories_data) {
		const story = new Story(story_data);
		story_results.set(story_data.story_id, story);
		const story_card = story.renderCard();
		stories_container.appendChild(story_card);
	}
};

const clearStories = () => {
	const stories_container = document.getElementById("stories_container");

	while (stories_container.firstChild) {
		stories_container.removeChild(stories_container.firstChild);
	}

	story_results.clear();
};

const loadSearchUsers = async query => {
	const users_data = await fetchUsersLike(query);
	populateUsers(users_data);
};

const populateUsers = (users_data) => {
	const users_container = document.getElementById("users_container");
    
	for (const user_data of users_data) {
		const user = new UserCard(user_data);
		user_results.push(user);
		const user_card = user.render();
		users_container.appendChild(user_card);
	}
};

const clearUsers = () => {
	const users_container = document.getElementById("users_container");

	while (users_container.firstChild) {
		users_container.removeChild(users_container.firstChild);
    }
};

const clearPage = () => {
    clearStories();
    clearUsers();
}

const loadPage = (query) => {
    loadSearchUsers(query);
    loadStories(query);
}


document.querySelector('.query-area').addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.querySelector('.query-area input').value;
    clearPage();
    loadPage(query);
    window.history.pushState('Object', 'Title',`${BASE_URL}/pages/search.php?query=${query}`)
});

const query = getParams().query;
if (query) {
    document.querySelector('.query-area input').value = query;
    loadPage(query);
}