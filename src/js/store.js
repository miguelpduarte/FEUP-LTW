// State store
const store = {
	user: undefined,
	user_loading_promise: undefined,
	story_votes: undefined,
	story_votes_loading_promise: undefined,
	comment_votes: undefined,
	comment_votes_loading_promise: undefined,
};

// Local state enum
export const VoteStatus = Object.freeze({
	none: 1,
	upvoted: 2,
	downvoted: 3,
});

// State actions

import { getUserLoginInfo, getLoggedUserStoryVotes, getLoggedUserCommentVotes } from "./fetch_actions/user_fetch_actions.js";

export const isUserLoggedIn = async () => {
	return !!await getUserInfo();
};

export const getUserInfo = () => {
	if (store.user !== undefined) {
		// User info already loaded, getting from "cache"
		return store.user;
	} else if (store.user_loading_promise) {
		return store.user_loading_promise;
	}

	store.user_loading_promise = new Promise(async resolve => {
		try {
			// User logged in
			const user_info = await getUserLoginInfo();
			store.user = user_info;
			store.user_loading_promise = undefined;
			return resolve(user_info);
		} catch (_) {
			// User not logged in
			store.user = null;
			store.user_loading_promise = undefined;
			return resolve(null);
		}
	});

	return store.user_loading_promise;
};

export const getUserStoryVotes = () => {
	if (store.story_votes !== undefined) {
		// User votes already loaded, getting from "cache"
		return store.story_votes;
	} else if (store.story_votes_loading_promise) {
		return store.story_votes_loading_promise;
	}

	store.story_votes_loading_promise = new Promise(async resolve => {
		try {
			// User logged in
			const user_votes = await getLoggedUserStoryVotes();
			store.story_votes = user_votes;
			store.story_votes_loading_promise = undefined;
			return resolve(user_votes);
		} catch (_) {
			// User not logged in
			store.story_votes = null;
			store.story_votes_loading_promise = undefined;
			return resolve(null);
		}
	});

	return store.story_votes_loading_promise;
};

export const getUserCommentVotes = () => {
	if (store.comment_votes !== undefined) {
		// User votes already loaded, getting from "cache"
		return store.comment_votes;
	} else if (store.comment_votes_loading_promise) {
		return store.comment_votes_loading_promise;
	}

	store.comment_votes_loading_promise = new Promise(async resolve => {
		try {
			// User logged in
			const comment_votes = await getLoggedUserCommentVotes();
			store.comment_votes = comment_votes;
			store.comment_votes_loading_promise = undefined;
			return resolve(comment_votes);
		} catch (_) {
			// User not logged in
			store.comment_votes = null;
			store.comment_votes_loading_promise = undefined;
			return resolve(null);
		}
	});

	return store.comment_votes_loading_promise;
};