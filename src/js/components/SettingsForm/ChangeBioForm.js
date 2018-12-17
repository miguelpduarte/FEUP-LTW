"use strict";

import { getLoggedUserBio, changeBio } from "../../fetch_actions/user_fetch_actions.js";
import { MarkdownEditor } from "../MarkdownEditor.js";

export class ChangeBioForm {
	constructor() {
		this.editor = new MarkdownEditor();
	}

	render() {
		const form_elem = document.createElement("form");
		form_elem.id = "change_bio_form";
		form_elem.setAttribute("novalidate", "");

		form_elem.innerHTML = `
			<div class="input-wrapper">
				<label>New Bio</label>
				<div class="editor-wrapper"></div>
				<div class="feedback"></div>
			</div>
            <button>Change Bio</button>
            <div class="result"></div>
		`;
		
		// Inserting markdown editor
		form_elem.querySelector(".editor-wrapper").appendChild(this.editor.render());

		// Adding event listeners

		form_elem.addEventListener("submit", e => {
			e.preventDefault();
			this.changeBio();
		});

		// Requesting the change to the editor content
		this.setInitialEditorContent();

		// Storing associated DOM Element for further use
		this.element = form_elem;

		return form_elem;
	}

	async setInitialEditorContent() {
		try {
			const res = await getLoggedUserBio();
			this.editor.setContent(res.bio);
		} catch (err) {
			console.error("User bio getting error", err);
		}
	}

	resetForm() {
		// Editor wrapper + feedback
		const editor_wrapper = this.element.querySelector(".editor-wrapper");
		editor_wrapper.classList.remove("invalid");
		editor_wrapper.classList.remove("valid");
		editor_wrapper.nextElementSibling.textContent = "";

		// Form + result
		this.element.querySelector(".result").textContent = "";
		this.element.classList.remove("invalid");
		this.element.classList.remove("valid");
	}

	async changeBio() {
		this.resetForm();

		// Verify form fields
		if (!this.fieldsAreValid()) {
			return;
		}

		// Make request
		const new_bio = this.editor.getContent();

		// Handle response
		try {
			await changeBio(new_bio);
			this.showSuccessMessage();
		} catch (err_msg) {
			this.showErrorMessage(err_msg);
		}
	}

	showErrorMessage(err_msg) {
		this.element.querySelector(".result").textContent = "Error: " + err_msg;
		this.element.classList.add("invalid");
	}

	showSuccessMessage() {
		this.element.querySelector(".result").textContent = "Bio changed successfully!";
		this.element.classList.add("valid");
	}

	fieldsAreValid() {
		let fields_are_valid = true;

		// Username field
		const new_bio = this.editor.getContent();
		const editor_wrapper = this.element.querySelector(".editor-wrapper");

		if (new_bio.length === 0) {
			editor_wrapper.classList.add("invalid");
			editor_wrapper.nextElementSibling.textContent = "New bio must not be empty!";
			fields_are_valid = false;
		} else {
			editor_wrapper.classList.add("valid");
		}

		// Idea taken from bootstrap, to avoid input results showing straight away (when using :valid and :invalid)
		this.element.classList.add("was-validated");

		return fields_are_valid;
	}
}