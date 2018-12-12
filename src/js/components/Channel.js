"use strict";

export class Channel {
	constructor(channel_data) {
		this.content_loaded = !!channel_data.content;
		this.data = channel_data;

	}

	render() {
		let article = document.createElement("article");
		article.classList.add("channel-card");
		article.id = `channel_${this.data.channel_id}`;
		article.innerHTML = `
            <div class="channel-card-info">
                <h1 class="title"><a href="channel.php?id=${this.data.channel_id}"></a></h1>
            </div>
            
        `;

		// Adding textContent

		// Channel name
		article.querySelector(".title a").textContent = this.data.name;

		// Adding event listeners

		// Storing attached DOM element for further use
		this.element = article;

		return article;
    }
}