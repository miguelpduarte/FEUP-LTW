"use strict";

import { logoutUser } from "../fetch_actions/user_fetch_actions.js";

const BASE_URL = "/~up201603647";

export class Navbar {
	render() {
		const navbar_elem = document.createElement("div");
		navbar_elem.id = "navbar";

		navbar_elem.innerHTML = `
            <span class="logo"><a href="${BASE_URL}/">GET</a></span>
            <div class="hamburger">
                <input type="checkbox" id="hamburger"/>
                <label for="hamburger"></label>
                
                <ul>
                    <li><a href="${BASE_URL}/">Stuff</a></li>
                    <li><a href="${BASE_URL}/pages/channels.php">Channels</a></li>
                    <li><a href="${BASE_URL}/ipsum.php">Lorem</a></li>
                    <li><a href="${BASE_URL}/pages/new_story.php">Add Story</a></li>
                </ul>
            </div>

            <div class="login-register">
                <ul>
                    <li><a href="${BASE_URL}/pages/login.php">Login</a></li>
                    <li><a href="${BASE_URL}/pages/register.php">Register</a></li>
                </ul>
            </div>
            <div class="user-details">
                <ul>
                    <li><a class="username" href="${BASE_URL}/pages/user.php?username=">loading_username</a></li>
                    <li><a href="${BASE_URL}/pages/settings.php">Settings</a></li>
                    <li><a class="logout">Logout</a></li>
                </ul>
            </div>
        `;

		// Adding event handlers

		navbar_elem.querySelector(".logout").addEventListener("click", () => {
			logoutUser()
			// Going to the homepage after logout
				.then(() => {window.location.href = `${BASE_URL}/pages/stories.php`;})
				.catch();
		});

		// Storing associated element
		this.element = navbar_elem;

		return navbar_elem;
	}

	updateWithUserInfo(user_info) {
		const username_elem = this.element.querySelector(".user-details .username");
		username_elem.textContent = user_info.username;
		username_elem.href = `${BASE_URL}/pages/user.php?username=${user_info.username}`;
		this.element.classList.add("logged-in");
	}
}
