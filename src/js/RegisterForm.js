"use strict";

import { createUser } from "./user_fetch_actions.js";

export class RegisterForm {
    constructor() {
        // Username should only contain letters, numbers and an underscore
        this.username_validator = /^[a-zA-Z_0-9]+$/;
    }

    render() {
        let register_form_elem = document.createElement("form");
        register_form_elem.id = "register_form"
        register_form_elem.classList.add("fancy-form");
        register_form_elem.method = "";
        register_form_elem.action = "";

        register_form_elem.innerHTML = `
            <label>Name
                <input type="text" name="name" required>
                <div class="feedback"></div>
            </label>
            <label>Username
                <input type="text" name="username" placeholder="Used for your login" required>
                <div class="feedback"></div>
            </label>
            <label>Password
                <input type="password" name="password" minlength="8" required>
                <div class="feedback"></div>
            </label>
            <label>Confirm Password
                <input type="password" name="password-confirmation" minlength="8" placeholder="Third time's the charm!" required>
                <div class="feedback"></div>
            </label>
            <button>Register</button>
            <div class="result"></div>
            <div class="extra-info">Don't have an account yet? <a href="/pages/register.php">Register here!</a></div>
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
            // Mark form as invalid
            return;
        }

        // Make request
        const name = this.element.querySelector("input[name='name']").value;
        const username = this.element.querySelector("input[name='username']").value;
        const password = this.element.querySelector("input[name='password']").value;
        const password_confirmation = this.element.querySelector("input[name='password-confirmation']").value;

        const response = await createUser(name, username, password, password_confirmation);

        // Handle response
    }

    fieldsAreValid() {
        let fields_are_valid = true;

        // Username should only contain letters, numbers and an underscore
        const username_input = this.element.querySelector("input[name='username']");

        if (!this.username_validator.test(username_input.value)) {
            // Username does not pass the regex test
            username_input.classList.add("invalid");
            username_input.nextElementSibling.textContent = "Username can only contain letters, numbers and underscores";
            fields_are_valid = false;
        } else {
            username_input.classList.remove("invalid");
            username_input.classList.add("valid");
            username_input.nextElementSibling.textContent = "";
        }

        // Password confirmation and passsword must match
        const password_input = this.element.querySelector("input[name='password']");
        const password_confirmation_input = this.element.querySelector("input[name='password-confirmation']");

        if (password_input.value !== password_confirmation_input.value) {
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

        return fields_are_valid;
    }
}