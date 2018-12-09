"use strict";
import { getUserInfo } from "../store.js";

export const fetchTopStories = () => {
	return new Promise((resolve, reject) => {
		fetch("/api/story.php")
			.then(res => res.json())
			.then(data => {
				console.log(data);
				// Checking for data errors
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject(data.reason);
				}
			})
			.catch(err => reject(err));
	});
};

export const fetchStory = id => {
	// Safety
	const real_id = Number.parseInt(id);

	return new Promise((resolve, reject) => {
		fetch(`/api/story.php?id=${real_id}`)
			.then(res => res.json())
			.then(data => {
				// Check for data errors
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject("Fetching not successful, reason: " + data.reason);
				}
			})
			.catch(err => console.error("Fetch error:", err));
	});
};

export const fetchComments = (story_id, n_comments, off, n_nested, n_off) => {
	const real_id = Number.parseInt(story_id);

	return new Promise((resolve, reject) => {
		fetch(`/api/comment.php?story_id=${real_id}&n_comments=${n_comments}&off=${
			off}&n_nested=${n_nested}&n_off=${n_off}`)
			.then(res => res.json())
			.then(data => {
				// Check for data errors
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject("Fetching not successful, reason: " + data.reason);
				}
			})
			.catch(err => console.error("Fetch error:", err));
	});
};

export const fetchSubComments = (comment_id, n_comments, off) => {
	const real_id = Number.parseInt(comment_id);

	return new Promise((resolve, reject) => {
		fetch(`/api/comment.php?comment_id=${real_id}&n_comments=${
			n_comments}&off=${off}`)
			.then(res => res.json())
			.then(data => {
				// Check for data errors
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject("Fetching not successful, reason: " + data.reason);
				}
			})
			.catch(err => console.error("Fetch error:", err));
	});
};

export const fetchPostStory = async (content, title, channel) => {
	const body = {
		content,
		title,
		channel,
		csrf: (await getUserInfo()).csrf
	};

	return new Promise((resolve, reject) => {
		fetch("/api/story.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(data => {  
				if (data.success) {
					return resolve(data);
				} else {
					return reject(data.code);
				}
			}).catch(err => console.error("Fetch error:", err));
	});
};

// upvote must be boolean
export const fetchVoteStory = async (id, upvote) => {
	// Safety
	const real_id = Number.parseInt(id);
	
	const body = {
		upvote,
		story_id: real_id,
		csrf: (await getUserInfo()).csrf
	};

	return new Promise((resolve, reject) => {
		fetch("/api/storyVote.php", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(data => {
				console.log("Voting response", data);
				if (data.success) {
					// There is no data, do not want to resolve with undefined explicitly as that would be useless
					return resolve();
				} else {
					return reject(data.code);
				}
			});
	});
};

export const fetchUnvoteStory = async id => {
	// Safety
	const real_id = Number.parseInt(id);

	const body = {
		story_id: real_id,
		csrf: (await getUserInfo()).csrf
	};

	return new Promise((resolve, reject) => {
		fetch("/api/storyVote.php", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(data => {
				console.log("Unvoting response", data);
				if (data.success) {
					// There is no data, do not want to resolve with undefined explicitly since that would be useless
					return resolve();
				} else {
					return reject(data.code);
				}
			});
	});
};