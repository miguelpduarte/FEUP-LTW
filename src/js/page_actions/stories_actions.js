"use strict";

import { Story } from "../components/Story.js";
import { fetchNewestStories, fetchTopStories } from "../fetch_actions/stories_fetch_actions.js";

let top_stories = [];
let newest_stories = [];
let loading = false;

const loadTopStories = async () => {
	const trending_stories_data = await fetchTopStories();
	populateTopStories(trending_stories_data);
};

const populateTopStories = (trending_stories_data) => {
	const top_stories_container = document.getElementById("top_stories_container");
    
	for(const trending_story_data of trending_stories_data) {
		const story = new Story(trending_story_data);
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

const loadNewestStories = async (offset, n_stories) => {
	loading = true;
	const top_stories_data = await fetchNewestStories(offset, n_stories);
	populateNewestStories(top_stories_data);
};

const populateNewestStories = (top_stories_data) => {
	const newest_stories_container = document.getElementById("newest_stories_container");
    
	for(const top_story_data of top_stories_data) {
		const story = new Story(top_story_data);
		newest_stories.push(story);
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

	newest_stories = [];
};

const refreshNewestStories = () => {
	clearNewestStories();
	loadNewestStories();
};

const refreshTopStories = () => {
	clearTopStories();
	loadTopStories();
};

const scrollListener = () => {
	if (document.getElementById("refresh_top_stories") === null) return;

	if (
		document.body.scrollHeight <=
		document.documentElement.scrollTop + window.innerHeight &&
		!loading
	) {
		loadNewestStories(newest_stories.length, 5);
	}
}

// This runs as the file is loaded from here down

document.getElementById("refresh_newest_stories").addEventListener("click", refreshNewestStories);
document.getElementById("refresh_top_stories").addEventListener("click", refreshTopStories);
document.addEventListener("scroll", () => scrollListener());


loadTopStories();
loadNewestStories(0, 5);