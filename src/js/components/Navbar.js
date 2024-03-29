"use strict";

import { logoutUser } from "../fetch_actions/user_fetch_actions.js";

const BASE_DIR = "BASE_DIR_PLACEHOLDER";

export class Navbar {
	render() {
		const navbar_elem = document.createElement("div");
		navbar_elem.id = "navbar";

		navbar_elem.innerHTML = `
            <span class="logo"><a href="${BASE_DIR}/">GET</a></span>
            
            <input type="checkbox" id="hamburger"/>
            <label for="hamburger">
                <i class="show fas fa-bars"></i>
                <i class="hide fas fa-times"></i>
            </label>
            
            <div class="nav-content">

                <div class="hamburger">
                    
                    <ul>
                        <li><a href="${BASE_DIR}/pages/channels.php">Channels</a></li>
                        <li class="search-url"><a href="${BASE_DIR}/pages/search.php">Search</a></li>
                    </ul>
                </div>

                
                <div class="login-register right-content">
                
                <ul>
                        <li> <div class="search">
                            <form class="search-bar" action="${BASE_DIR}/pages/search.php" method="GET">
                                <input type="text" class="query-input" name="query" placeholder="Insert your query here" autocomplete="off">
                            </form>
                        </div> </li>
                        <li><a href="${BASE_DIR}/pages/login.php">Login</a></li>
                        <li><a href="${BASE_DIR}/pages/register.php">Register</a></li>
                    </ul>
                </div>
                <div class="user-details right-content">
                    <ul>
                        <li> <div class="search">
                            <form class="search-bar" action="${BASE_DIR}/pages/search.php" method="GET">
                                <input type="text" class="query-input" name="query" placeholder="Insert your query here" autocomplete="off">
                            </form>
                        </div> </li>
                        <li><a class="username" href="${BASE_DIR}/pages/user.php?username=">loading_username</a></li>
                        <li><a href="${BASE_DIR}/pages/settings.php">Settings</a></li>
                        <li><a class="logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        `;

		// Adding event handlers

		navbar_elem.querySelector(".logout").addEventListener("click", () => {
			logoutUser()
			// Going to the homepage after logout
				.then(() => {window.location.href = `${BASE_DIR}/pages/stories.php`;})
				.catch();
		});

		// Storing associated element
		this.element = navbar_elem;

		return navbar_elem;
	}

	updateWithUserInfo(user_info) {
		const username_elem = this.element.querySelector(".user-details .username");
		username_elem.textContent = user_info.username;
		username_elem.href = `${BASE_DIR}/pages/user.php?username=${user_info.username}`;
		this.element.classList.add("logged-in");
	}
}
