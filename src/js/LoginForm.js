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
                <input type="text" name="username">
            </label>
            <label>Password
                <input type="password" name="password">
            </label>
            <button>Click</button>
        `;


        // Adding event listeners

        login_form_elem.querySelector('button').addEventListener('click', e => {
            e.preventDefault();
        });

        // Storing associated DOM Element for further use
        this.element = login_form_elem;

        return login_form_elem;
    }
}