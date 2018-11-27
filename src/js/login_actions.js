"use strict";

import { LoginForm } from "./LoginForm.js";
import { isUserLoggedIn } from "./store.js";
import { SimpleSuccessMessage } from "./SimpleSuccessMessage.js";

let login_form = null;
let login_success_msg = null;

const initLoginForm = async () => {
    if (await isUserLoggedIn()) {
        window.location.href = "/pages/stories.php?logged_in";
        return;
    }

    const login_form_container = document.getElementById("login_form_container");
    login_form = new LoginForm();
    const rendered_login_form = login_form.render();
    login_form_container.appendChild(rendered_login_form);
};

const clearLoginForm = () => {
    const login_form_container = document.getElementById("login_form_container");
    while (login_form_container.firstChild) {
        login_form_container.removeChild(login_form_container.firstChild);
    }

    login_form = null;
};

export const changeToSuccessfulLoginView = () => {
    clearLoginForm();
    const content_container = document.getElementById("content");
    login_success_msg = new SimpleSuccessMessage(
        "Login successful!",
        "",
        [{href: "/pages/stories.php", text: "Homepage"}]
    );
    const rendered_login_success_msg = login_success_msg.render();
    content_container.appendChild(rendered_login_success_msg);
};

// This runs as the file is loaded from here down

initLoginForm();