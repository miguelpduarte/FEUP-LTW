"use strict";

import { getUserInfo } from "../store.js";




export const fetchChannelStories = (id, offset, n_stories) => {
	return new Promise((resolve, reject) => {
		fetch(`../api/channel.php?id=${id}&n_stories=${n_stories}&off=${offset}`)
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


