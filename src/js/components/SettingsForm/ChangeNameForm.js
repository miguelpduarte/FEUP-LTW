"use strict";

import { changeName } from "../../fetch_actions/user_fetch_actions.js";

export class ChangeNameForm {
	render() {
		const form_elem = document.createElement("form");
		form_elem.id = "change_name_form";
		form_elem.setAttribute("novalidate", "");
		form_elem.method = "";
		form_elem.action = "";

		form_elem.innerHTML = `
            <label>New Name
                <input type="text" name="new_name" required>
                <div class="feedback"></div>
			</label>
            <button>Change Name</button>
            <div class="result"></div>
        `;

		// Adding event listeners

		form_elem.addEventListener("submit", e => {
			e.preventDefault();
			this.changeName();
		});

		// Storing associated DOM Element for further use
		this.element = form_elem;

		return form_elem;
	}

	resetForm() {
		// Inputs + feedback
		this.element.querySelectorAll("input").forEach(input => {
			input.classList.remove("invalid");
			input.classList.remove("valid");
			input.nextElementSibling.textContent = "";
		});

		// Form + result
		this.element.querySelector(".result").textContent = "";
		this.element.classList.remove("invalid");
		this.element.classList.remove("valid");
	}

	async changeName() {
		this.resetForm();

		// Verify form fields
		if (!this.fieldsAreValid()) {
			return;
		}

		// Make request
		const new_name = this.element.querySelector("input[name='new_name']").value;
		// const password = this.element.querySelector("input[name='password']").value;

		// Handle response
		try {
			await changeName(new_name);
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
		this.element.querySelector(".result").textContent = "Name changed successfully!";
		this.element.classList.add("valid");
	}

	fieldsAreValid() {
		let fields_are_valid = true;

		// Username field
		const new_name_input = this.element.querySelector("input[name='new_name']");

		if (new_name_input.value.length === 0) {
			new_name_input.classList.add("invalid");
			new_name_input.nextElementSibling.textContent = "Username must not be empty!";
			fields_are_valid = false;
		} else {
			new_name_input.classList.add("valid");
		}

		// Idea taken from bootstrap, to avoid input results showing straight away (when using :valid and :invalid)
		this.element.classList.add("was-validated");

		return fields_are_valid;
	}
}