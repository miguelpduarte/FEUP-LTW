"use strict";

import { mdToHTML } from "../../utils.js";
import { isUserLoggedIn, VoteStatus, getUserInfo } from "../../store.js";
import { GenericStory } from "./GenericStory.js";

export class Story extends GenericStory {
	constructor(story_data) {
		super();

		this.data = story_data;
		
		// Cast score to int because BE can't do it - so it can be used with incrementing and decrementing
		// No longer necessary i believe
		// this.data.score = parseInt(story_data.score);

		this.is_open = false;

		this.vote_status = VoteStatus.none;
	}

	render() {
		let section = document.createElement("section");
		section.id = `story_${this.data.story_id}`;
		section.className = "full-story";

		
		section.innerHTML = `
            <section class="story-header">
                <div class="story-info">
                    
                    <h1 class="title"><a href="story.php?id=${this.data.story_id}"></a></h1>
                    <div class="story-details">
                        <span class="author"><a href="user.php?username=${this.data.author_name}"></a></span>
                        <i class="fas fa-user-clock"></i>
                        <span class="date">${moment(this.data.created_at).fromNow()}</span>
                    </div>
                </div>
                <div class="voting-wrapper">
                    <i class="vote-up fas fa-chevron-up"></i>
                    <div class="score">${this.data.score}</div>
                    <i class="vote-down fas fa-chevron-down"></i>
                </div>
            </section>
            <hr/>
            <div class="content">${mdToHTML(this.data.content)}</div>
        `;

		section.querySelector(".title").textContent = this.data.title;
		// Author name
		section.querySelector(".story-details .author a").textContent = this.data.author_name;

		// Upvoting
		section.querySelector(".vote-up").addEventListener("click", e => {
			e.stopPropagation();
			this.upvote();
		});

		// Downvoting
		section.querySelector(".vote-down").addEventListener("click", e => {
			e.stopPropagation();
			this.downvote();
		});

		this.element = section;

		// Adding channel information
		const info_elem = this.element.querySelector(".story-info");
		const channel_info_promise = this.fetchChannelInfo(info_elem);

		// Adding editing buttons and possibilities if the logged in user is the story author
		this.addEditingIfAuthor(channel_info_promise);
		
		return section;
	}

	async addEditingIfAuthor(channel_info_promise) {
		// To ensure concurrency
		await channel_info_promise;

		if (!await isUserLoggedIn()) {
			return;
		}

		const logged_in_username = (await getUserInfo()).username;

		if (logged_in_username !== this.data.author_name) {
			return;
		}

		// The logged in user is the post author, create editing elements and etc

		// Channel editing
		const channel_pencil = document.createElement("i");
		channel_pencil.classList.add("fas", "fa-pencil-alt");
		channel_pencil.addEventListener("click", () => {
			this.element.classList.add("editing-channel");
		});
		this.element.querySelector(".channel-info").appendChild(channel_pencil);

		const channel_edit_form = document.createElement("form");
		channel_edit_form.classList.add("channel-edit");
		channel_edit_form.innerHTML =`
		<input type="text"></input>
		<button>Save</button>
		`;
		this.element.querySelector(".story-info").prepend(channel_edit_form);		

	}
}