"use strict";
import { getUserInfo } from "../store.js";

export const fetchTopStories = () => {
	return new Promise((resolve, reject) => {
		fetch("/api/story.php")
			.then(res => res.json())
			.then(data => {
				// Checking for data errors
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject("Fetching not successful, reason: " + data.reason);
				}
			})
			.catch(err => console.error("Fetch error:", err));
	});
};

export const fetchStory = id => {
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
	let body = {
		content,
		title,
		channel,
		csrf: (await getUserInfo()).csrf
	};

	return new Promise((resolve, reject) => {
		fetch("/api/story.php", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(data => {  
				//Check for data errors
				console.log(data);
				if(data.success) {
					return resolve(data);
				} else {
					return reject(data.code);
				}
			}).catch(err => console.error("Fetch error:", err));
	});
};