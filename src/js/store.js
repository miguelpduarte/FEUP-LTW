// State store
const store = {
	user: undefined,
	user_loading_promise: undefined,
	user_votes: undefined,
	user_votes_loading_promise: undefined,
};

// State actions

import { getUserLoginInfo, getLoggedUserVotes } from "./fetch_actions/user_fetch_actions.js";

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

export const getUserVotes = () => {
	if (store.user_votes !== undefined) {
		// User votes already loaded, getting from "cache"
		return store.user_votes;
	} else if (store.user_votes_loading_promise) {
		return store.user_votes_loading_promise;
	}

	store.user_votes_loading_promise = new Promise(async resolve => {
		try {
			// User logged in
			const user_votes = await getLoggedUserVotes();
			store.user_votes = user_votes;
			store.user_votes_loading_promise = undefined;
			return resolve(user_votes);
		} catch (_) {
			// User not logged in
			store.user_votes = null;
			store.user_votes_loading_promise = undefined;
			return resolve(null);
		}
	});

	return store.user_votes_loading_promise;
};