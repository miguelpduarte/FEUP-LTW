"use strict";

export class LoginForm {
    constructor() {
    }

    render() {
        let login_form_elem = document.createElement("form");
        login_form_elem.id = "login_form"
        login_form_elem.classList.add("fancy-form");
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

    loginUser() {
        if (!this.fieldsAreValid()) {
            return;
        }

        // Verify form fields

        // Make request

        // Handle response
    }

    fieldsAreValid() {
        return true;
    }
}