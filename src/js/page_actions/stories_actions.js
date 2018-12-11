"use strict";

import { Story } from "../components/Story.js";
import { fetchTopStories } from "../fetch_actions/stories_fetch_actions.js";
import { isUserLoggedIn, getUserStoryVotes } from "../store.js";

const trending_stories = new Map();
const top_stories = new Map();

const loadStories = async () => {
	loadTrendingStories();
	loadTopStories();

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
		// These are not yet done but this is here so it will work later as well
		const matching_trending = trending_stories.get(user_vote.story_id);
		if (matching_trending) {
			matching_trending.setUpvoted(rating);
		}
	}
};

const loadTrendingStories = async () => {
	console.log("TODO: Actually load trending stories");
	const trending_stories_data = [{
		score: 0,
		story_id: -1,
		author_id: -1,
		title: "Oh boy! A trending story!",
		content: "This is some content here! *Lorem* __Lorem__!!",
		channel: -1,
		created_at: "2018-11-05 19:20:33",
		updated_at: null,
		author_name: "influencer"
	}];
	populateTrendingStories(trending_stories_data);
};

const populateTrendingStories = (trending_stories_data) => {
	const trending_stories_container = document.getElementById("trending_stories_container");
    
	for (const trending_story_data of trending_stories_data) {
		const story = new Story(trending_story_data);
		trending_stories.set(trending_story_data.story_id, story);
		const story_card = story.renderCard();
		trending_stories_container.appendChild(story_card);
	}
};

const clearTrendingStories = () => {
	const trending_stories_container = document.getElementById("trending_stories_container");

	while (trending_stories_container.firstChild) {
		trending_stories_container.removeChild(trending_stories_container.firstChild);
	}

	trending_stories.clear();
};

const loadTopStories = async () => {
	const top_stories_data = await fetchTopStories();
	populateTopStories(top_stories_data);
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

const refreshTopStories = () => {
	clearTopStories();
	loadTopStories();
};

const refreshTrendingStories = () => {
	clearTrendingStories();
	loadTrendingStories();
};

// This runs as the file is loaded from here down

document.getElementById("refresh_top_stories").addEventListener("click", refreshTopStories);
document.getElementById("refresh_trending_stories").addEventListener("click", refreshTrendingStories);

loadStories();