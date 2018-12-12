"use strict";
import { getUserInfo } from "../store.js";

export const fetchComments = (story_id, n_comments, off, n_nested, n_off) => {
	const real_id = Number.parseInt(story_id);

	return new Promise((resolve, reject) => {
		fetch(`../api/comment.php?story_id=${real_id}&n_comments=${n_comments}&off=${
			off}&n_nested=${n_nested}&n_off=${n_off}`)
			.then(res => res.json())
			.then(data => {
				// Check for data errors
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject(data.reason);
				}
			})
			.catch(err => console.error("Fetch error:", err));
	});
};

export const fetchSubComments = (comment_id, n_comments, off) => {
	const real_id = Number.parseInt(comment_id);

	return new Promise((resolve, reject) => {
		fetch(`../api/comment.php?comment_id=${real_id}&n_comments=${
			n_comments}&off=${off}`)
			.then(res => res.json())
			.then(data => {
				// Check for data errors
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject(data.reason);
				}
			})
			.catch(err => console.error("Fetch error:", err));
	});
};

export const fetchVoteComment = async (id, upvote) => {
	// Safety
	const real_id = Number.parseInt(id);
	
	const body = {
		upvote,
		comment_id: real_id,
		csrf: (await getUserInfo()).csrf
	};

	return new Promise((resolve, reject) => {
		fetch("/api/commentVote.php", {
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

export const fetchUnvoteComment = async id => {
	// Safety
	const real_id = Number.parseInt(id);

	const body = {
		comment_id: real_id,
		csrf: (await getUserInfo()).csrf
	};

	return new Promise((resolve, reject) => {
		fetch("/api/commentVote.php", {
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

export const fetchPostComment = async (story_id, content) => {
	let user = await getUserInfo();
	if (user === null)
		throw 1;
	let body = {
		story_id: Number.parseInt(story_id),
		content,
		csrf: user.csrf
	};

    return new Promise((resolve, reject) => {
		fetch("../api/comment.php", {
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
				if (data.success) {
					return resolve(data);
				} else {
					return reject(data.code);
				}
			}).catch(err => console.error("Fetch error:", err));
	});
};

export const fetchPostSubComment = async (comment_id, content) => {
	let user = await getUserInfo();
	if (user === null)
		throw 1;
	let body = {
		comment_id: Number.parseInt(comment_id),
		content,
		csrf: user.csrf
	};

	return new Promise((resolve, reject) => {
		fetch("../api/comment.php", {
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
				if (data.success) {
					return resolve(data);
				} else {
					return reject(data.code);
				}
			}).catch(err => console.error("Fetch error:", err));
	});
};
