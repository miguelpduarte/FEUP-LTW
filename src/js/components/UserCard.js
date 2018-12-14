"use strict";

import { mdToHTML } from "../utils.js";

export class UserCard {
	constructor(data) {
		this.username = data.username;
	}
	render() {
		let article = document.createElement("div");
		article.classList.add("user-card");
		article.innerHTML = `
                <div class="user-card-info">
                    <i class="far fa-user"></i>
                    <h1 class="username">
                        <a href="user.php?username=${this.username}"></a>
                    </h1>
                </div>
        `;
		
		article.querySelector('.username').textContent = this.username;
		this.element = article;
		return article;
	}
}