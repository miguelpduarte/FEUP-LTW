"use strict";

import { RegisterForm } from "./RegisterForm.js";
import { isLoggedIn } from "./user_fetch_actions.js";
import { LoginOrHomepage } from "./LoginOrHomepage.js";

let register_form = null;
let login_or_homepage = null;

const initRegisterForm = () => {
    if (isLoggedIn()) {
        window.location.href = "/pages/stories.php?logged_in";
        return;
    }

    const register_form_container = document.getElementById("register_form_container");
    register_form = new RegisterForm();
    const rendered_register_form = register_form.render();
    register_form_container.appendChild(rendered_register_form);
};

const clearRegisterForm = () => {
    const register_form_container = document.getElementById("register_form_container");
    while (register_form_container.firstChild) {
        register_form_container.removeChild(register_form_container.firstChild);
    }

    register_form = null;
};

export const changeToLoginOrHomepageView = () => {
    clearRegisterForm();
    const content_container = document.getElementById("content");
    login_or_homepage = new LoginOrHomepage();
    const rendered_login_or_homepage = login_or_homepage.render();
    content_container.appendChild(rendered_login_or_homepage);
};

// This runs as the file is loaded from here down

// initRegisterForm();
changeToLoginOrHomepageView();