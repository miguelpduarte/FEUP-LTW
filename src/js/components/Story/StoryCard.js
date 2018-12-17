"use strict";

import { fetchStory } from "../../fetch_actions/stories_fetch_actions.js";
import { mdToHTML } from "../../utils.js";
import { GenericStory } from "./GenericStory.js";

export class StoryCard extends GenericStory {
	constructor(story_data) {
		super();
		this.content_loaded = !!story_data.content;
		this.data = story_data;
		
		this.is_open = false;
	}

	render() {
		let div = document.createElement("div");
		// Adding the story id as a class and not an id because it can be duplicated if it is both in newest and top stories
		div.classList.add("story-card", `story_${this.data.story_id}`);
		div.innerHTML = `
            <div class="story-card-header">
				<div class="story-card-info">
					<div class="channel-info"></div>				
                    <h2 class="title"><a href="story.php?id=${this.data.story_id}"></a></h2>
                    <div class="story-card-details">
                        <span class="author"><a href="user.php?username=${this.data.author_name}"></a></span>
                        <i class="fas fa-user-clock"></i>
						<span class="date">${moment(this.data.created_at).fromNow()}</span>
						<i class="fas fa-comments"></i>
						<span class="n_comments">${this.data.n_comments}</span>
                    </div>
                </div>
                <div class="voting-wrapper">
                    <div class="score">${this.data.score}</div>                    
                    <div class="voting">
                        <i class="vote-up fas fa-chevron-up"></i>
                        <div class="score">${this.data.score}</div>
                        <i class="vote-down fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            <div class="content-wrapper">
                <hr/>
                <div class="content"></div>
            </div>
        `;

		// Adding textContent

		// div title
		div.querySelector(".title a").textContent = this.data.title;
		// Author name
		div.querySelector(".story-card-details .author a").textContent = this.data.author_name;
		// div content
		div.querySelector(".content").innerHTML = this.content_loaded ? mdToHTML(this.data.content) : "Loading...";

		// Adding event listeners

		// div opening
		div.addEventListener("click", e => {
			//To ensure that clicking on the story or user link does not attempt to open or close the card
			if (e.target.tagName !== "A") {
				this.toggleCardOpen();
			}
		});

		// Upvoting
		div.querySelector(".vote-up").addEventListener("click", e => {
			e.stopPropagation();
			this.upvote();
		});

		// Downvoting
		div.querySelector(".vote-down").addEventListener("click", e => {
			e.stopPropagation();
			this.downvote();
		});

		// Transition fix because of image loading
		const card_content_wrapper = div.getElementsByClassName("content-wrapper")[0];
		card_content_wrapper.addEventListener("transitionend", () => {
			this.resizeCardContentWrapper(card_content_wrapper);
		});

		// Storing attached DOM element for further use
		this.element = div;

		// Adding channel information
		const channel_info_elem = this.element.querySelector(".channel-info");
		this.fetchChannelInfo(channel_info_elem);

		return div;
	}

	resizeCardContentWrapper(card_content_wrapper) {
		if (this.is_open && this.card_content_wrapper_calc_height && this.card_content_wrapper_calc_height !== card_content_wrapper.scrollHeight) {
			card_content_wrapper.style.height = card_content_wrapper.scrollHeight+"px";
			this.card_content_wrapper_calc_height = card_content_wrapper.scrollHeight;
		}
	}

	async toggleCardOpen() {
		if (!this.content_loaded) {
			this.element.classList.add("loading");
			await this.addCardContent();
			this.element.classList.remove("loading");
		}

		const card_content_wrapper = this.element.getElementsByClassName("content-wrapper")[0];

		if (this.is_open) {
			this.element.classList.remove("open");
			card_content_wrapper.style.height = 0;
			this.is_open = false;
		} else {
			this.element.classList.add("open");
			card_content_wrapper.style.height = card_content_wrapper.scrollHeight+"px";
			this.card_content_wrapper_calc_height = card_content_wrapper.scrollHeight;
			this.is_open = true;
			this.element.scrollIntoView({
				behavior: "smooth",
				block: "start", 
				inline: "start"
			});
		}
	}

	async addCardContent() {
		const story_data = await fetchStory(this.data.story_id);
		this.data = story_data;

		this.element.getElementsByClassName("content")[0].innerHTML = mdToHTML(this.data.content);
		this.content_loaded = true;
	}
}