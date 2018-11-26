"use strict";

import { RegisterForm } from "./RegisterForm.js";
import { isLoggedIn } from "./user_fetch_actions.js";

let register_form = null;

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

const changeToLoginOrHomepageView = () => {
    
}

// This runs as the file is loaded from here down

initRegisterForm();