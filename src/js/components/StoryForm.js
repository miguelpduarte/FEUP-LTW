import { MarkdownEditor } from "./MarkdownEditor.js";
import { fetchPostStory }  from "../fetch_actions/stories_fetch_actions.js";
import { errorHandler } from "../ErrorHandler.js";
import { whitespaceString } from "../utils.js";
import { fetchChannelLike } from "../fetch_actions/channels_fetch_actions.js";


export class StoryForm {
	render() {
		this.element = document.createElement("div");
		this.element.classList.add("story-form");
        
		this.createForm();
		this.createButton();
		this.createMsgUser();
        
		this.form.appendChild(this.msgSection);
		this.form.appendChild(this.button);
		this.element.appendChild(this.form);

		return this.element;
	}

	createMsgUser() {
		this.msgSection = document.createElement("div");
		this.msgSection.classList.add("msg-field");
	}

	createButton() {
		this.button = document.createElement("button");
		this.button.classList.add("submit-button");
		this.button.value = "submit";
		this.button.innerHTML = "Post";

		this.button.addEventListener("click", (e) => {
			e.preventDefault(); 
			this.submit();
		});
	}

	async submit() {
		let response;
		let content = this.markdown_editor.getContent();
		let title  = this.form.getElementsByClassName("title-input")[0].value;
		let channel = this.form.getElementsByClassName("channel-selector")[0].value;

		if (!this.fieldsAreValid(content, title))
			return;
        
		try {                
			response = await fetchPostStory(content, title, channel);
		} catch (error) {
			const err = errorHandler.getError(error);
			this.showErrorMessage(err.msg);
			err.defaultAction();
			return;
		}
		window.location.href = `../pages/story.php?id=${response.story_id}`;

	}

	fieldsAreValid(content, title) {
		if (whitespaceString(content)) {
			this.showErrorMessage("The story's content is empty");
			return false;
		}

		if (whitespaceString(title)) {
			this.showErrorMessage("The story's title is empty");
			return false;
		}
        
		return true;
	}

	showErrorMessage(err_msg) {
		this.element.querySelector(".msg-field").textContent = "Error: " + err_msg;
		this.element.classList.add("invalid");
	}

	createForm() {
		this.form = document.createElement("form");
		this.form.classList.add("new-story");
		this.form.method = "post";
		this.form.action = "../api/story.php";
		this.form.innerHTML = 
        `<div class="title-area">
            <input type="text" id="title" class="title-input" name="title" placeholder="Insert your title here">
        </div>
        <div class="channel-area">
            <input type="text" name="channel-selector" class="channel-selector" 
                list="channel-suggestions" autocomplete="off" placeholder="Insert the channel here">
            <datalist id="channel-suggestions"></datalist>
        </div>
        <div class="editor"></div>`;

		this.markdown_editor = new MarkdownEditor();
		this.form.querySelector(".editor").appendChild(this.markdown_editor.render());
		this.form.querySelector(".channel-selector").addEventListener("input", () => this.channelUpdated = true);
		window.setInterval(() => this.updateSugestions(), 1000);
	}

	async updateSugestions() {
		if (!this.channelUpdated)
			return;

		const prefix = this.form.getElementsByClassName("channel-selector")[0].value;
		this.channelUpdated = false;
		let channels = await fetchChannelLike(prefix);

		let datalist = document.getElementById("channel-suggestions");
		while (datalist.firstChild) {
			datalist.removeChild(datalist.firstChild);
		}

		for (const channel of channels) {
			let elemet = document.createElement("option");
			elemet.value = channel.name;
			datalist.appendChild(elemet);
		}

	}
}