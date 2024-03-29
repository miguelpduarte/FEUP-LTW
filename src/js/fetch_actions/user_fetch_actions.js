"use strict";

import { getCsrf, deleteCsrf } from "../store.js";

export const createUser = (name, username, password, password_confirmation) => {
	const body = JSON.stringify({
		name,
		username,
		password,
		password_confirmation,
	});

	return new Promise((resolve, reject) => {
		fetch("../api/user.php", {
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
					return reject(data.code);
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
		fetch("../api/login.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: body,
		})
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

export const getUserLoginInfo = () => {

	return new Promise((resolve, reject) => {
		if (getCsrf() === null) {
			reject();
		}

		fetch(`../api/login.php?csrf=${getCsrf()}`)
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
		fetch("../api/storyVote.php")
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
		fetch("../api/commentVote.php")
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

export const getLoggedUserBio = () => {
	return new Promise((resolve, reject) => {
		fetch("../api/settings/changeBio.php")
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
		fetch("../api/login.php", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				csrf: getCsrf()
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					deleteCsrf();
					return resolve();
				} else {
					return reject(data.reason);
				}
			});
	});
};

export const changeName = new_name => {
	return new Promise(async (resolve, reject) => {
		fetch("../api/settings/changeName.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				csrf: getCsrf(),
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

export const changePassword = (old_password, new_password, new_password_confirmation) => {
	const body = {
		old_password,
		new_password,
		new_password_confirmation,
		csrf: getCsrf(),
	};

	return new Promise((resolve, reject) => {
		fetch("../api/settings/changePassword.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(res =>  res.json())
			.then(data => {
				if (data.success) {
					return resolve();
				} else {
					return reject(data.reason);
				}
			});
	});
};

export const changeBio = new_bio => {
	const body = {
		new_bio,
		csrf: getCsrf(),
	};

	return new Promise((resolve, reject) => {
		fetch("../api/settings/changeBio.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
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


export const fetchUserStories = (username, offset, n_stories) => {
	return new Promise((resolve, reject) => {
		fetch(`../api/userStories.php?username=${username}&n_stories=${n_stories}&off=${offset}`)
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

export const fetchUserData = (username) => {
	return new Promise((resolve, reject) => {
		fetch(`../api/user.php?username=${username}`)
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


export const fetchUsersLike = query => {
	return new Promise((resolve, reject) => {
		fetch(`../api/search/user.php?query=${query}`)
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

