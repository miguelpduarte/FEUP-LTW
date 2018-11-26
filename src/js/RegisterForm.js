"use strict";

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
                <input type="text" name="name">
                <div class="feedback"></div>
            </label>
            <label>Username
                <input type="text" name="username" placeholder="Used for your login">
                <div class="feedback"></div>
            </label>
            <label>Password
                <input type="password" name="password" minlength="8">
                <div class="feedback"></div>
            </label>
            <label>Confirm Password
                <input type="password" name="password-confirmation" minlength="8" placeholder="Third time's the charm!">
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

    registerUser() {
        if (!this.fieldsAreValid()) {
            return;
        }

        // Verify form fields

        // Make request

        // Handle response
    }

    fieldsAreValid() {
        let fields_are_valid = true;

        // Username should only contain letters, numbers and an underscore
        const username_input = this.element.querySelector("input[name='username']");

        if (!this.username_validator.test(username_input.value)) {
            // Username does not pass the regex test
            username_input.setAttribute("valid", false);
            console.log(username_input);
            username_input.nextElementSibling.textContent = "Username can only contain letters, numbers and underscores";
            fields_are_valid = false;
        }

        // Password confirmation and passsword must match
        const password_input = this.element.querySelector("input[name='password']");
        const password_confirmation_input = this.element.querySelector("input[name='password-confirmation']");

        if (password_input.value !== password_confirmation_input.value) {
            // Fields are not equal
            password_confirmation_input.setAttribute("valid", false);
            password_confirmation_input.nextElementSibling.textContent = "The fields do not match";
            password_input.setAttribute("valid", false);
            password_input.nextElementSibling.textContent = "The fields do not match";
            fields_are_valid = false;
        }

        return fields_are_valid;
    }
}