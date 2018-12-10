"use strict";

import { Story } from "../components/Story.js";
import { fetchTopStories } from "../fetch_actions/stories_fetch_actions.js";

let trending_stories = [];
let top_stories = [];

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
    
	for(const trending_story_data of trending_stories_data) {
		const story = new Story(trending_story_data);
		trending_stories.push(story);
		const story_card = story.renderCard();
		trending_stories_container.appendChild(story_card);
	}
};

const clearTrendingStories = () => {
	const trending_stories_container = document.getElementById("trending_stories_container");

	while (trending_stories_container.firstChild) {
		trending_stories_container.removeChild(trending_stories_container.firstChild);
	}

	trending_stories = [];
};

const loadTopStories = async () => {
	const top_stories_data = await fetchTopStories();
	populateTopStories(top_stories_data);
};

const populateTopStories = (top_stories_data) => {
	const top_stories_container = document.getElementById("top_stories_container");
    
	for(const top_story_data of top_stories_data) {
		const story = new Story(top_story_data);
		top_stories.push(story);
		const story_card = story.renderCard();
		top_stories_container.appendChild(story_card);
	}
};

const clearTopStories = () => {
	const top_stories_container = document.getElementById("top_stories_container");

	while (top_stories_container.firstChild) {
		top_stories_container.removeChild(top_stories_container.firstChild);
	}

	top_stories = [];
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

loadTrendingStories();
loadTopStories();