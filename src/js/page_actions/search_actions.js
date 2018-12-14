"use strict"

import { Channel } from "../components/Channel.js";
import { Story } from "../components/Story.js";
import { getParams } from "../utils.js";
import { fetchStoriesLike } from "../fetch_actions/stories_fetch_actions.js"
import { fetchUsersLike } from "../fetch_actions/user_fetch_actions.js"
import { fetchChannelLike } from "../fetch_actions/channels_fetch_actions.js"
import { isUserLoggedIn, getUserStoryVotes } from "../store.js";
import { UserCard } from "../components/UserCard.js";

const BASE_URL = ""

const story_results = new Map();
let queryUpdated = false;


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

const loadChannels = async (query) => {
	const channels_data = await fetchChannelLike(query);
	populateChannels(channels_data);
};

const populateChannels = (channels_data) => {
	const channels_container = document.getElementById("channels_container");
    
	for (const channel_data of channels_data) {
		const channel = new Channel(channel_data);
		const channel_card = channel.render();
		channels_container.appendChild(channel_card);
	}
};

const clearChannels = () => {
	const channels_container = document.getElementById("channels_container");

	while (channels_container.firstChild) {
		channels_container.removeChild(channels_container.firstChild);
	}

};


const clearPage = () => {
    clearStories();
	clearUsers();
	clearChannels();
}

const loadPage = (query) => {
	loadChannels(query);
    loadSearchUsers(query);
    loadStories(query);
}

const updateSugestions = () => {
	if (!queryUpdated)
		return;
	const query = document.querySelector('.query-area input').value;
	if (query === "")
		return;
	clearPage();	
    loadPage(query);
	window.history.pushState('Object', 'Title',`${BASE_URL}/pages/search.php?query=${query}`);
	queryUpdated = false;
}

window.setInterval(() => updateSugestions(), 200);
document.querySelector('.query-area input').addEventListener('input', (e) => {
    clearPage();
    queryUpdated = true;
});

document.querySelectorAll('.search-link').forEach(search_link => { 
	search_link.addEventListener('click', (e) => {
		e.preventDefault();
		document.querySelector(e.target.dataset.target).scrollIntoView({
			behavior: "smooth",
			block: "start", 
			inline: "start"
		});
	})
});

const query = getParams().query;
if (query) {
    document.querySelector('.query-area input').value = query;
    loadPage(query);
}