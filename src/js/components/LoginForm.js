"use strict";

import { loginUser } from "../fetch_actions/user_fetch_actions.js";
import { changeToSuccessfulLoginView } from "../page_actions/login_actions.js";

export class LoginForm {
	render() {
		const login_form_elem = document.createElement("form");
		login_form_elem.id = "login_form";
		login_form_elem.classList.add("fancy-form");
		login_form_elem.setAttribute("novalidate", "");
		login_form_elem.method = "";
		login_form_elem.action = "";

		login_form_elem.innerHTML = `
            <label>Username
                <input type="text" name="username" required>
                <div class="feedback"></div>
            </label>
            <label>Password
                <input type="password" name="password" required>
                <div class="feedback"></div>
            </label>
            <button>Login</button>
            <div class="result"></div>
            <div class="extra-info">Don't have an account yet? <a href="/pages/register.php">Register here!</a></div>
        `;

		// Adding event listeners

		login_form_elem.addEventListener("submit", e => {
			e.preventDefault();
			this.loginUser();
		});

		// Storing associated DOM Element for further use
		this.element = login_form_elem;

		return login_form_elem;
	}

	async loginUser() {
		// Verify form fields
		if (!this.fieldsAreValid()) {
			return;
		}

		// Make request
		const username = this.element.querySelector("input[name='username']").value;
		const password = this.element.querySelector("input[name='password']").value;

		// Handle response
		try {
			await loginUser(username, password);
			changeToSuccessfulLoginView();
		} catch (err_msg) {
			this.showErrorMessage(err_msg);
		}
	}

	showErrorMessage(err_msg) {
		this.element.querySelector(".result").textContent = "Error: " + err_msg + " (se for erro de SQL direto é esparguete do ângelo)";
		this.element.classList.add("invalid");
	}

	fieldsAreValid() {
		let fields_are_valid = true;

		// Username field
		const username_input = this.element.querySelector("input[name='username']");

		if (username_input.value.length === 0) {
			username_input.classList.add("invalid");
			username_input.nextElementSibling.textContent = "Username must not be empty!";
			fields_are_valid = false;
		} else {
			username_input.classList.remove("invalid");
			username_input.classList.add("valid");
			username_input.nextElementSibling.textContent = "";
		}

		// Password field
		const password_input = this.element.querySelector("input[name='password']");

		if (password_input.value.length === 0) {
			password_input.classList.add("invalid");
			password_input.nextElementSibling.textContent = "Password must not be empty!";
			fields_are_valid = false;
		} else {
			password_input.classList.remove("invalid");
			password_input.classList.add("valid");
			password_input.nextElementSibling.textContent = "";
		}

		// Idea taken from bootstrap, to avoid input results showing straight away (when using :valid and :invalid)
		this.element.classList.add("was-validated");

		return fields_are_valid;
	}
}