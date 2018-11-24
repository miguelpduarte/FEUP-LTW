"use strict";

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
                    <li><a href="/pages/user.php?username=">loading_username</a></li>
                    <li><a href="/pages/settings.php">Settings</a></li>
                    <li><a href="/pages/logout.php">Logout</a></li>
                </ul>
            </div>
        `;

        // Storing associated element
        this.element = navbar_elem;

        return navbar_elem;
    }

    updateWithUserInfo(user_info) {
        this.user_info = user_info;

        this.element.classList.add("logged-in");
    }
}