"use strict";

import { logoutUser } from "./user_fetch_actions.js";

export class Navbar {
    constructor() {
    }

    render() {
        let navbar_elem = document.createElement('div');
        navbar_elem.id = "navbar";

        navbar_elem.innerHTML = `
            <span class="logo"><a href="/">GET</a></span>
            <div class="hamburger">
                <input type="checkbox" id="hamburger"/>
                <label for="hamburger"></label>
                
                <ul>
                    <li><a href="/">Stuff</a></li>
                    <li><a href="/pages/channels.php">Channels</a></li>
                    <li><a href="/ipsum.php">Lorem</a></li>
                    <li><a href="/pages/new_story.php">Add Story</a></li>
                </ul>
            </div>

            <div class="login-register">
                <ul>
                    <li><a href="/pages/login.php">Login</a></li>
                    <li><a href="/pages/register.php">Register</a></li>
                </ul>
            </div>
            <div class="user-details">
                <ul>
                    <li><a class="username" href="/pages/user.php?username=">loading_username</a></li>
                    <li><a href="/pages/settings.php">Settings</a></li>
                    <li><a class="logout">Logout</a></li>
                </ul>
            </div>
        `;

        // Adding event handlers

        navbar_elem.querySelector(".logout").addEventListener("click", () => {
            logoutUser()
                // Going to the homepage after logout
                .then(() => {window.location.href = "/pages/stories.php"})
                .catch();
        });

        // Storing associated element
        this.element = navbar_elem;

        return navbar_elem;
    }

    updateWithUserInfo(user_info) {
        const username_elem = this.element.querySelector(".user-details .username");
        username_elem.textContent = user_info.username;
        username_elem.href = `/pages/user.php?username=${user_info.username}`;
        this.element.classList.add("logged-in");
    }
}