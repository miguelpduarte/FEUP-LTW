"use strict";

import { Channel } from "../components/Channel.js";
import { fetchChannels } from "../fetch_actions/channels_fetch_actions.js";

let loading = false;


const loadChannels = async (offset, n_stories) => {
	loading = true;
	const channels_data = await fetchChannels(offset, n_stories);
	populateChannels(channels_data);
};

const populateChannels = (channels_data) => {
	const channels_container = document.getElementById("channels_container");
    
	for (const channel_data of channels_data) {
		const channel = new Channel(channel_data);
		
		const channel_card = channel.render();
		channels_container.appendChild(channel_card);
	}

	loading = false;
};

const clearChannels = () => {
	const channels_container = document.getElementById("channels_container");

	while (channels_container.firstChild) {
		channels_container.removeChild(channels_container.firstChild);
	}

};


const scrollListener = () => {
	const channels_container = document.getElementById("channels_container");
	if (channels_container === null) return;

	if (
		document.body.scrollHeight <=
		document.documentElement.scrollTop + window.innerHeight &&
		!loading
	) {
		loadChannels(channels_container.children.length, 5);
	}
};

// This runs as the file is loaded from here down

document.addEventListener("scroll", () => scrollListener());


loadChannels();