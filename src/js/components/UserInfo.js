"use strict";
import { mdToHTML } from "../utils.js";

export class UserInfo {
	constructor(data) {
		this.name = data.name;
		this.username = data.username;
		this.storyScore = data.storyScore;
		this.commentScore = data.commentScore;
		this.bio = data.bio;
	}

	render() {
		this.element = document.createElement("div");
		this.element.classList.add("user-info");
		this.element.innerHTML = `
            <h2 class="info-username"></h2>
            <h3 class="info-name"></h3>
            <div class="info-scores">
                <p class="info-storyScore"></p>
                <p class="info-commentScore"></p>
            </div>
            <p class="info-bio"> </p>
            `;

		this.element.querySelector(".info-name").textContent = this.name;
		this.element.querySelector(".info-username").textContent = this.username;
		this.element.querySelector(".info-storyScore").textContent = this.storyScore || 0;
		this.element.querySelector(".info-commentScore").textContent = this.commentScore || 0;
		this.element.querySelector(".info-bio").innerHTML = mdToHTML(this.bio);
		return this.element;
	}
}