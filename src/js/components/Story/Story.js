"use strict";

import { mdToHTML } from "../../utils.js";
import { isUserLoggedIn, getUserInfo } from "../../store.js";
import { GenericStory } from "./GenericStory.js";
import { fetchEditStoryChannel, fetchEditStoryContent } from "../../fetch_actions/stories_fetch_actions.js";
import { MarkdownEditor } from "../MarkdownEditor.js";

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
			<div class="story-line">
            	<hr/>
			</div>
            <div class="content">${mdToHTML(this.data.content)}</div>
        `;

		section.querySelector(".title").textContent = this.data.title;
		// Author name
		section.querySelector(".story-details .author a").textContent = this.data.author_name;

		if (this.data.updated_at) {
			// Adding updated at visualization
			const updated_at_icon = document.createElement("i");
			updated_at_icon.classList.add("fas", "fa-user-edit");
			const updated_at_span = document.createElement("span");
			updated_at_span.classList.add("edit-date");
			updated_at_span.textContent = moment(this.data.updated_at).fromNow();
			// console.log("u_at", this.data.updated_at);

			const story_details_elem = section.querySelector(".story-details");
			story_details_elem.appendChild(updated_at_icon);
			story_details_elem.appendChild(updated_at_span);
		}

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
		channel_pencil.classList.add("fas", "fa-pen");
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
		this.content_editor = new MarkdownEditor();

		const edit_content_form = document.createElement("form");
		edit_content_form.classList.add("content-edit");
		edit_content_form.setAttribute("novalidate", "");
		edit_content_form.method = "";
		edit_content_form.action = "";

		edit_content_form.innerHTML = `
			<div class="editor-wrapper"></div>
			<div class="error"></div>
			<div class="buttons">
				<button>Save</button>
				<div class="cancel">Cancel</div>
			</div>
		`;
		
		// Inserting markdown editor
		edit_content_form.querySelector(".editor-wrapper").appendChild(this.content_editor.render());

		// Adding event listeners
		edit_content_form.querySelector(".cancel").addEventListener("click", () => {
			this.element.classList.remove("editing-content");
			this.editing_content = false;
		});

		edit_content_form.addEventListener("submit", async e => {
			e.preventDefault();

			// New content must not be empty
			const new_content = this.content_editor.getContent();
			if (!new_content) {
				edit_content_form.querySelector(".error").textContent = "New story content must not be empty!";
				return;
			}

			// Attempt to set new content
			try {
				await fetchEditStoryContent(this.data.story_id, new_content);
				this.updateStoryContent(new_content);
			} catch (err) {
				edit_content_form.querySelector(".error").textContent = err;
				return;
			}

			this.element.classList.remove("editing-content");
			this.editing_content = false;
		});

		this.element.querySelector(".content").insertAdjacentElement("beforebegin", edit_content_form);

		const content_pencil = document.createElement("i");
		content_pencil.classList.add("fas", "fa-pen", "content-edit-pencil");
		content_pencil.addEventListener("click", () => {
			// The plain text is only available in this.data
			const curr_content = this.data.content;
			this.content_editor.setContent(curr_content);
			// Clearing any previous errors
			this.element.querySelector(".content-edit .error").textContent = "";
			this.element.classList.add("editing-content");
			this.editing_content = true;
		});

		this.element.querySelector(".story-line").appendChild(content_pencil);
	}

	updateStoryContent(new_content) {
		// Saving the new content for sequential edits
		this.data.content = new_content;
		// Rerendering the new markdown text
		this.element.querySelector(".content").innerHTML = mdToHTML(new_content);
	}
}