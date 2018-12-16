"use strict";

import { mdToHTML } from "../../utils.js";
import { isUserLoggedIn, getUserInfo } from "../../store.js";
import { GenericStory } from "./GenericStory.js";
import { fetchEditStoryChannel } from "../../fetch_actions/stories_fetch_actions.js";

export class Story extends GenericStory {
	constructor(story_data) {
		super();

		this.data = story_data;
	}

	render() {
		let section = document.createElement("section");
		section.id = `story_${this.data.story_id}`;
		section.className = "full-story";

		
		section.innerHTML = `
            <section class="story-header">
                <div class="story-info">
                    <div class="channel-info"></div>
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
		const channel_info_elem = this.element.querySelector(".channel-info");
		const channel_info_promise = this.fetchChannelInfo(channel_info_elem);

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

		// Thus, the logged in user is the post author, create editing elements

		this.createChannelEditing();
		this.createContentEditing();
	}

	async createChannelEditing() {
		const channel_pencil = document.createElement("i");
		channel_pencil.classList.add("fas", "fa-pencil-alt");
		channel_pencil.addEventListener("click", () => {
			// Setting the initial input box value to be the current channel text (without the hashtag)
			const hashless_curr_channel_name = this.element.querySelector(".channel-info a").textContent.substr(1);
			this.element.querySelector(".channel-edit input[name='new_channel']").value = hashless_curr_channel_name;
			// Clearing any previous errors
			this.element.querySelector(".channel-edit .error").textContent = "";
			this.element.classList.add("editing-channel");
			this.editing_channel = true;
		});
		this.element.querySelector(".channel-info").appendChild(channel_pencil);

		const channel_edit_form = document.createElement("form");
		channel_edit_form.classList.add("channel-edit");
		channel_edit_form.innerHTML = `
			<input type="text" name="new_channel"></input>
			<button>Save</button>
			<div class="cancel">Cancel</div>
			<div class="error"></div>
		`;
		channel_edit_form.addEventListener("submit", async e => {
			e.preventDefault();

			// No field validation is necessary (empty channel field means default channel)
			const new_channel = channel_edit_form.querySelector("input[name='new_channel']").value;

			try {
				const res = await fetchEditStoryChannel(this.data.story_id, new_channel);
				// Update internal data
				this.data.channel = res.channel_id;
				this.updateChannelInfo();
			} catch (err) {
				this.element.querySelector(".channel-edit .error").textContent = err;
				return;
			}

			this.element.classList.remove("editing-channel");
			this.editing_channel = false;
		});
		channel_edit_form.querySelector(".cancel").addEventListener("click", () => {
			this.element.classList.remove("editing-channel");
			this.editing_channel = false;
		});
		this.element.querySelector(".story-info").prepend(channel_edit_form);
	}

	updateChannelInfo() {
		const channel_info_elem = this.element.querySelector(".channel-info");
		// Removing the previous channel link
		channel_info_elem.removeChild(channel_info_elem.firstChild);
		// Adding the new one
		this.fetchChannelInfo(channel_info_elem);
	}

	async createContentEditing() {

	}
}