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


export const fetchPostStory = async (content, title, channel) => {
	let user = await getUserInfo();
    if(user === null)
        throw 1;
	let body = {
		content,
		title,
		channel,
		csrf: user.csrf
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
				if(data.success) {
					return resolve(data);
				} else {
					return reject(data.code);
				}
			}).catch(err => console.error("Fetch error:", err));
	});
};