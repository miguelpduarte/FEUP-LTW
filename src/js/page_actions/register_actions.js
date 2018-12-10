"use strict";

import { RegisterForm } from "../components/RegisterForm.js";
import { isUserLoggedIn } from "../store.js";
import { SimpleMessage } from "../components/SimpleMessage.js";

let register_form = null;

const initRegisterForm = async () => {
	if (await isUserLoggedIn()) {
		showAlreadyLoggedIn();
		return;
	}

	const register_form_container = document.getElementById("register_form_container");
	register_form = new RegisterForm();
	const rendered_register_form = register_form.render();
	register_form_container.appendChild(rendered_register_form);
};

const showAlreadyLoggedIn = () => {
	const content_container = document.getElementById("content");
	const already_logged_in = new SimpleMessage(
		"You are already logged in!",
		"You must first logout to create an account!",
		[{href: "/pages/stories.php", text: "Homepage"}]
	);
	const rendered_already_logged_in = already_logged_in.render();
	content_container.appendChild(rendered_already_logged_in);
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
	const login_or_homepage = new SimpleMessage(
		"Account registered successfully!",
		"You may now login with your account!",
		[{href: "/pages/stories.php", text: "Homepage"}, {href: "/pages/login.php", text: "Login"}]
	);
	const rendered_login_or_homepage = login_or_homepage.render();
	content_container.appendChild(rendered_login_or_homepage);
};

// This runs as the file is loaded from here down

initRegisterForm();