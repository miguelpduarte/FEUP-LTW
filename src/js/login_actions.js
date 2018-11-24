"use strict";

import { LoginForm } from "./LoginForm.js";

let login_form = null;

// ONLY FOR MOCKING, WILL NOT BE HERE NOR DO ONLY THIS
const userIsLoggedIn = () => {
    return false;
}

const initLoginForm = () => {
    if (userIsLoggedIn()) {
        window.location.href = "/pages/stories.php?logged_in";
        return;
    }

    const login_form_container = document.getElementById("login_form_container");
    login_form = new LoginForm();
    const rendered_login_form = login_form.render();
    login_form_container.appendChild(rendered_login_form);
};

// This runs as the file is loaded from here down

initLoginForm();