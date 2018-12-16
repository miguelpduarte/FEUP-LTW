"use strict";

import { Story } from "../components/Story/Story.js";
import { CommentSection } from "../components/CommentSection.js";
import { getParams } from "../utils.js";
import { fetchStory } from "../fetch_actions/stories_fetch_actions.js";
import { fetchComments } from "../fetch_actions/comments_fetch_actions.js";
import { isUserLoggedIn, getUserStoryVotes, getUserCommentVotes } from "../store.js";

let story = null;
let comment_section = null;

const createStory = (story_data, comment_data) => {
	const story_container = document.getElementById("story_container");
	const comments_container = document.getElementById("comments_container");
	story = new Story(story_data);
	comment_section = new CommentSection(comment_data, story_data.story_id);
	story_container.appendChild(story.render());
	comments_container.appendChild(comment_section.render());
};

export const reloadCommentsFromMemory = () => {
	const comments_container = document.getElementById("comments_container");
	while (comments_container.firstChild) {
		comments_container.removeChild(comments_container.firstChild);
	}
	comments_container.appendChild(comment_section.render());
};

const loadCurrentStory = async () => {
	const params = getParams();
	const story_data = await fetchStory(params.id);
	const comment_data = await fetchComments(params.id, 2, 0, 2, 0);
	createStory(story_data, comment_data);
	updateStoryVoting(story_data.story_id);
	updateCommentsVoting();
};

const updateStoryVoting = async story_id => {
	if (await isUserLoggedIn()) {
		const user_votes = await getUserStoryVotes();
		const this_vote = user_votes.find(vote => vote.story_id === story_id);
		if (this_vote) {
			story.setUpvoted(parseInt(this_vote.rating));
		}
	}
};

const updateCommentsVoting = async () => {
	if (await isUserLoggedIn()) {
		const comment_votes = await getUserCommentVotes();
		comment_section.updateVoting(comment_votes);
	}
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
