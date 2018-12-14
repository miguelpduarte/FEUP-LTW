"use strict";

export const fetchChannelLike = query => {
	return new Promise((resolve, reject) => {
		fetch(`../api/channel.php?query=${query}`)
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

export const fetchChannels = (offset, n_channels) => {
	const real_offset = Number.parseInt(offset);
	const real_n_channels = Number.parseInt(n_channels);

	return new Promise((resolve, reject) => {
		fetch(`/api/channel.php?off=${real_offset}&n_stories=${real_n_channels}`)
			.then(res => res.json())
			.then(data => {
				// Checking for data errors
				if (data.success) {
					console.log('====================================');
					console.log(data.data);
					console.log('====================================');
					return resolve(data.data);
				} else {
					return reject("Fetching not successful, reason: " + data.reason);
				}
			})
			.catch(err => console.error("Fetch error:", err));
	});
}