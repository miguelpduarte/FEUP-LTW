"use strict";

import { changePassword } from "../../fetch_actions/user_fetch_actions.js";
import { changeToSuccessfulPasswordChangedView } from "../../page_actions/settings_actions.js";
// import { changeToSuccessfulSettingsChangedView } from "../page_actions/settings_actions.js";

export class ChangePasswordForm {
	render() {
		const form_elem = document.createElement("form");
		form_elem.id = "change_pw_form";
		form_elem.setAttribute("novalidate", "");
		form_elem.method = "";
		form_elem.action = "";

		form_elem.innerHTML = `
			<label>Old Password
                <input type="password" name="old_password" required>
                <div class="feedback"></div>
            </label>
			<label>New Password
                <input type="password" name="new_password" required>
                <div class="feedback"></div>
            </label>
            <label>Confirm New Password
                <input type="password" name="new_password_confirm" required>
                <div class="feedback"></div>
            </label>
            <button>Change Password</button>
            <div class="result"></div>
        `;

		// Adding event listeners

		form_elem.addEventListener("submit", e => {
			e.preventDefault();
			this.changePassword();
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

	async changePassword() {
		this.resetForm();

		// Verify form fields
		if (!this.fieldsAreValid()) {
			return;
		}

		// Make request
		const old_password = this.element.querySelector("input[name='old_password']").value;
		const new_password = this.element.querySelector("input[name='new_password']").value;
		const new_password_confirm = this.element.querySelector("input[name='new_password_confirm']").value;

		// Handle response
		try {
			await changePassword(old_password, new_password, new_password_confirm);
			changeToSuccessfulPasswordChangedView();
		} catch (err_msg) {
			this.showErrorMessage(err_msg);
		}
	}

	showErrorMessage(err_msg) {
		this.element.querySelector(".result").textContent = "Error: " + err_msg;
		this.element.classList.add("invalid");
	}

	fieldsAreValid() {
		return true;
		let fields_are_valid = true;

		// Old password field
		const old_password = this.element.querySelector("input[name='old_password']");

		if (old_password.value.length === 0) {
			old_password.classList.add("invalid");
			old_password.nextElementSibling.textContent = "Old Password must not be empty!";
			fields_are_valid = false;
		}

		// New password confirmation and new passsword fields
		const new_password = this.element.querySelector("input[name='new_password']");
		const new_password_confirmation = this.element.querySelector("input[name='new_password_confirmation']");

		if (new_password.value.length === 0) {
			new_password.classList.add("invalid");
			new_password.nextElementSibling.textContent = "New Password must not be empty!";
			fields_are_valid = false;
		} else if (new_password.value.length < 8) {
			new_password.classList.add("invalid");
			new_password.nextElementSibling.textContent = "New Password must have at least 8 characters!";
			fields_are_valid = false;
		} else if (new_password.value !== new_password_confirmation.value) {
			// Fields are not equal
			new_password_confirmation.classList.add("invalid");
			new_password_confirmation.nextElementSibling.textContent = "The fields do not match";
			new_password.classList.add("invalid");
			new_password.nextElementSibling.textContent = "The fields do not match";
			fields_are_valid = false;
		} else {
			new_password_confirmation.classList.add("valid");
			new_password.classList.add("valid");
		}

		// Idea taken from bootstrap, to avoid input results showing straight away (when using :valid and :invalid)
		this.element.classList.add("was-validated");

		return fields_are_valid;
	}
}