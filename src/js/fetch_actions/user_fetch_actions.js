"use strict";

import { getUserInfo } from "../store.js";

export const createUser = (name, username, password, password_confirmation) => {
	const body = JSON.stringify({
		name,
		username,
		password,
		password_confirmation,
	});

	return new Promise((resolve, reject) => {
		fetch("/api/user.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: body,
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

export const loginUser = (username, password) => {
	const body = JSON.stringify({
		username,
		password
	});

	return new Promise((resolve, reject) => {
		fetch("/api/login.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: body,
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

export const getUserLoginInfo = () => {
	return new Promise((resolve, reject) => {
		fetch("/api/login.php")
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject(data.reason);
				}
			})
			.catch(err => reject(err));
	});
};

export const getLoggedUserStoryVotes = () => {
	return new Promise((resolve, reject) => {
		fetch("/api/storyVote.php")
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject(data.reason);
				}
			})
			.catch(err => reject(err));
	});
};

export const getLoggedUserCommentVotes = () => {
	return new Promise((resolve, reject) => {
		fetch("/api/commentVote.php")
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					return resolve(data.data);
				} else {
					return reject(data.reason);
				}
			});
	});
};

export const logoutUser = () => {
	return new Promise(async (resolve, reject) => {
		fetch("/api/login.php", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				csrf: (await getUserInfo()).csrf
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					return resolve();
				} else {
					return reject(data.reason);
				}
			});
	});
};

export const changeName = new_name => {
	return new Promise(async (resolve, reject) => {
		fetch("/api/settings/changeName.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				csrf: (await getUserInfo()).csrf,
				new_name
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					return resolve();
				} else {
					return reject(data.reason);
				}
			});
	});
};

export const changePassword = async (old_password, new_password, new_password_confirmation) => {
	const body = {
		old_password,
		new_password,
		new_password_confirmation,
		csrf: (await getUserInfo()).csrf,
	};

	return new Promise((resolve, reject) => {
		fetch("/api/settings/changePassword.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(async res =>  res.json())
			.then(data => {
				if (data.success) {
					return resolve();
				} else {
					return reject(data.reason);
				}
			});
	});
};