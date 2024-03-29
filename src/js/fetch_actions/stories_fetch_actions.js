"use strict";
import { getCsrf } from "../store.js";

export const fetchNewestStories = (offset, n_stories) => {
	const real_offset = Number.parseInt(offset);
	const real_n_stories = Number.parseInt(n_stories);

	return new Promise((resolve, reject) => {
		fetch(`../api/story.php?off=${real_offset}&n_stories=${real_n_stories}`)
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

export const fetchTopStories = () => {
	return new Promise((resolve, reject) => {
		fetch("../api/top_stories.php")
			.then(res => res.json())
			.then(data => {
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
		fetch(`../api/story.php?id=${real_id}`)
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

export const fetchPostStory = (content, title, channel) => {
	const body = {
		content,
		title,
		channel,
		csrf: getCsrf()
	};

	return new Promise((resolve, reject) => {
		fetch("../api/story.php", {
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

export const fetchEditStoryChannel = (story_id, new_channel) => {
	const body = {
		story_id,
		new_channel,
		csrf: getCsrf()
	};

	return new Promise((resolve, reject) => {
		fetch("../api/channel.php", {
			method: "PATCH",
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
					return reject(data.reason);
				}
			})
			.catch(err => reject(err));
	});
};

export const fetchEditStoryContent = (story_id, new_content) => {
	const body = {
		story_id,
		new_content,
		csrf: getCsrf()
	};

	return new Promise((resolve, reject) => {
		fetch("../api/story.php", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					return resolve();
				} else {
					return reject(data.reason);
				}
			})
			.catch(err => reject(err));
	});
};

// upvote must be boolean
export const fetchVoteStory = (id, upvote) => {
	// Safety
	const real_id = Number.parseInt(id);
	
	const body = {
		upvote,
		story_id: real_id,
		csrf: getCsrf()
	};

	return new Promise((resolve, reject) => {
		fetch("../api/storyVote.php", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject(data.code);
				}
			});
	});
};

export const fetchUnvoteStory = id => {
	// Safety
	const real_id = Number.parseInt(id);

	const body = {
		story_id: real_id,
		csrf: getCsrf()
	};

	return new Promise((resolve, reject) => {
		fetch("../api/storyVote.php", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject(data.code);
				}
			});
	});
};

export const fetchStoriesLike = query => {
	return new Promise((resolve, reject) => {
		fetch(`../api/search/story.php?query=${query}`)
			.then(res => res.json())
			.then(data => {
				// Check for data errors
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject(data.code);
				}
			})
			.catch(err => console.error("Fetch error:", err));
	});
};
