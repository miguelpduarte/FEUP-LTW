"use strict";

import { createUser } from "../fetch_actions/user_fetch_actions.js";
import { changeToLoginOrHomepageView } from "../page_actions/register_actions.js";
import { errorHandler } from "../ErrorHandler.js";

export class RegisterForm {
	constructor() {
		// Username should only contain letters, numbers and underscores
		this.username_validator = /^[a-zA-Z_0-9]+$/;
	}

	render() {
		let register_form_elem = document.createElement("form");
		register_form_elem.id = "register_form";
		register_form_elem.classList.add("fancy-form");
		register_form_elem.setAttribute("novalidate", "");

		register_form_elem.innerHTML = `
			<div class="input-wrapper">
				<label for="name">Name</label>
				<input id="name" type="text" name="name" required>
				<div class="feedback"></div>
			</div>
			<div class="input-wrapper">
				<label for="username">Username</label>
				<input id="username" type="text" name="username" placeholder="Used for your login" required>
				<div class="feedback"></div>
			</div>
			<div class="input-wrapper">
	            <label for="password">Password</label>
                <input id="password" type="password" name="password" minlength="8" required>
                <div class="feedback"></div>
			</div>
			<div class="input-wrapper">
				<label for="password_confirmation">Confirm Password</label>
				<input id="password_confirmation" type="password" name="password-confirmation" minlength="8" placeholder="Third time's the charm!" required>
				<div class="feedback"></div>
			</div>
            <button>Register</button>
            <div class="result"></div>
        `;

		// Adding event listeners

		register_form_elem.addEventListener("submit", e => {
			e.preventDefault();
			this.registerUser();
		});

		// Storing associated DOM Element for further use
		this.element = register_form_elem;

		return register_form_elem;
	}

	async registerUser() {
		// Verify form fields
		if (!this.fieldsAreValid()) {
			return;
		}

		// Make request
		const name = this.element.querySelector("input[name='name']").value;
		const username = this.element.querySelector("input[name='username']").value;
		const password = this.element.querySelector("input[name='password']").value;
		const password_confirmation = this.element.querySelector("input[name='password-confirmation']").value;

		// Handle response
		try {
			// (Errors are sent to catch block instead of returning directly)
			await createUser(name, username, password, password_confirmation);
			changeToLoginOrHomepageView();
		} catch (error) {
			const err = errorHandler.getError(error);
			this.showErrorMessage(err.msg);
			err.defaultAction();
			return;
		}
	}

	showErrorMessage(err_msg) {
		this.element.querySelector(".result").textContent = "Error: " + err_msg;
		this.element.classList.add("invalid");
	}

	fieldsAreValid() {
		let fields_are_valid = true;

		// Name field
		const name_input = this.element.querySelector("input[name='name']");

		if (name_input.value.length === 0) {
			name_input.classList.add("invalid");
			name_input.nextElementSibling.textContent = "Name must not be empty!";
			fields_are_valid = false;
		} else {
			name_input.classList.remove("invalid");
			name_input.classList.add("valid");
			name_input.nextElementSibling.textContent = "";
		}

		// Username should only contain letters, numbers and an underscore
		const username_input = this.element.querySelector("input[name='username']");

		if (username_input.value.length === 0) {
			username_input.classList.add("invalid");
			username_input.nextElementSibling.textContent = "Username must not be empty!";
			fields_are_valid = false;
		} else if (!this.username_validator.test(username_input.value)) {
			// Username does not pass the regex test
			username_input.classList.add("invalid");
			username_input.nextElementSibling.textContent = "Username can only contain letters, numbers and underscores";
			fields_are_valid = false;
		} else {
			username_input.classList.remove("invalid");
			username_input.classList.add("valid");
			username_input.nextElementSibling.textContent = "";
		}

		// Password confirmation and passsword fields
		const password_input = this.element.querySelector("input[name='password']");
		const password_confirmation_input = this.element.querySelector("input[name='password-confirmation']");

		if (password_input.value.length === 0) {
			password_input.classList.add("invalid");
			password_input.nextElementSibling.textContent = "Password must not be empty!";
			fields_are_valid = false;
		} else if (password_input.value.length < 8) {
			password_input.classList.add("invalid");
			password_input.nextElementSibling.textContent = "Password must have at least 8 characters!";
			fields_are_valid = false;
		} else if (password_input.value !== password_confirmation_input.value) {
			// Fields are not equal
			password_confirmation_input.classList.add("invalid");
			password_confirmation_input.nextElementSibling.textContent = "The fields do not match";
			password_input.classList.add("invalid");
			password_input.nextElementSibling.textContent = "The fields do not match";
			fields_are_valid = false;
		} else {
			password_confirmation_input.classList.remove("invalid");
			password_confirmation_input.classList.add("valid");
			password_confirmation_input.nextElementSibling.textContent = "";
			password_input.classList.remove("invalid");
			password_input.classList.add("valid");
			password_input.nextElementSibling.textContent = "";
		}

		// Idea taken from bootstrap, to avoid input results showing straight away (when using :valid and :invalid)
		this.element.classList.add("was-validated");

		return fields_are_valid;
	}
}