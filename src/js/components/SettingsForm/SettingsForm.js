"use strict";

import { ChangeNameForm } from "./ChangeNameForm.js";
import { ChangePasswordForm } from "./ChangePasswordForm.js";
import { ChangeBioForm } from "./ChangeBioForm.js";

export class SettingsForm {
	constructor() {
		this.change_name_form = new ChangeNameForm();
		this.change_bio_form = new ChangeBioForm();
		this.change_password_form = new ChangePasswordForm();
	}

	render() {
		const wrapper_elem = document.createElement("div");
		wrapper_elem.id = "settings_form";
		
		// Adding sub forms
		wrapper_elem.appendChild(this.change_name_form.render());
		wrapper_elem.appendChild(this.createSpacer());
		wrapper_elem.appendChild(this.change_bio_form.render());
		wrapper_elem.appendChild(this.createSpacer());
		wrapper_elem.appendChild(this.change_password_form.render());

		// Storing associated DOM Element for further use
		this.element = wrapper_elem;

		return wrapper_elem;
	}

	createSpacer() {
		const spacer = document.createElement("hr");
		return spacer;
	}
}