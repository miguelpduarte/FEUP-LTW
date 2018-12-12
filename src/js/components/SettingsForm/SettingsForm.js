"use strict";

import { ChangeNameForm } from "./ChangeNameForm.js";
import { ChangePasswordForm } from "./ChangePasswordForm.js";

export class SettingsForm {
	constructor() {
		this.change_name_form = new ChangeNameForm();
		this.change_password_form = new ChangePasswordForm();
	}

	render() {
		const wrapper_elem = document.createElement("div");
		wrapper_elem.id = "settings_form";

		const spacer = document.createElement("hr");
		
		// Adding sub forms
		wrapper_elem.appendChild(this.change_name_form.render());
		wrapper_elem.appendChild(spacer);
		wrapper_elem.appendChild(this.change_password_form.render());

		// Storing associated DOM Element for further use
		this.element = wrapper_elem;

		return wrapper_elem;
	}
}