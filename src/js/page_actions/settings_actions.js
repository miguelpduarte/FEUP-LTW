"use strict";

import { SettingsForm } from "../components/SettingsForm.js";
import { isUserLoggedIn } from "../store.js";
import { SimpleMessage } from "../components/SimpleMessage.js";

let settings_form = null;

const initSettingsForm = async () => {
	if (!await isUserLoggedIn()) {
		showNotLoggedIn();
		return;
	}

	const settings_form_container = document.getElementById("settings_form_container");
	settings_form = new SettingsForm();
	const rendered_settings_form = settings_form.render();
	settings_form_container.appendChild(rendered_settings_form);
};

const showNotLoggedIn = () => {
	console.log("wow");
	const content_container = document.getElementById("content");
	const not_logged_in = new SimpleMessage(
		"You are not logged in!",
		"You must first login to access this page!",
		[{href: "./stories.php", text: "Homepage"}, {href: "./login.php", text: "Login"}]
	);
	const rendered_not_logged_in = not_logged_in.render();
	content_container.appendChild(rendered_not_logged_in);
};

const clearSettingsForm = () => {
	const settings_form_container = document.getElementById("settings_form_container");
	while (settings_form_container.firstChild) {
		settings_form_container.removeChild(settings_form_container.firstChild);
	}

	settings_form = null;
};

export const changeToSuccessfulSettingsChangedView = () => {
	clearSettingsForm();
	const content_container = document.getElementById("content");
	const settings_change_success_msg = new SimpleMessage(
		"Settings changed successfully!",
		"",
		[{href: "/pages/stories.php", text: "Homepage"}]
	);
	const rendered_settings_change_success_msg = settings_change_success_msg.render();
	content_container.appendChild(rendered_settings_change_success_msg);
};

// This runs as the file is loaded from here down

initSettingsForm();