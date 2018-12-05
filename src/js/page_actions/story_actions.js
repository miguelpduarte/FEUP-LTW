"use strict";

import { Story } from "../components/Story.js";
import { CommentSection } from "../components/CommentSection.js";
import { getParams } from "../utils.js";
import { fetchStory, fetchComments } from "../fetch_actions/stories_fetch_actions.js";

let story = null;
let comments = null;

const createStory = (story_data, comment_data) => {
	const story_container = document.getElementById("story_container");
	const comments_container = document.getElementById("comments_container");
	story = new Story(story_data);
	comments = new CommentSection(comment_data, story_data.story_id);
	story_container.appendChild(story.renderFull());
	comments_container.appendChild(comments.render());
};

export const reloadCommentsFromMemory = () => {
	const comments_container = document.getElementById("comments_container");
	while (comments_container.firstChild) {
		comments_container.removeChild(comments_container.firstChild);
	}
	comments_container.appendChild(comments.render());
};

const loadCurrentStory = async () => {
	const params = getParams();
	const story_data = await fetchStory(params.id);
	const comment_data = await fetchComments(params.id, 2, 0, 2, 0);
	createStory(story_data, comment_data);
};

///Deprecated
/* 
const clearCurrentStory = () => {
	const story_container = document.getElementById("story_container");

	while (story_container.firstChild) {
		story_container.removeChild(story_container.firstChild);
	}

	const comments_container = document.getElementById("comments_container");

	while (comments_container.firstChild) {
		comments_container.removeChild(comments_container.firstChild);
	}
};

const reloadCurrentStory = () => {
	clearCurrentStory();
	loadCurrentStory();
};
*/

loadCurrentStory();