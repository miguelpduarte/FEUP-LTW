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
        `;

        // Storing associated element
        this.element = navbar_elem;

        return navbar_elem;
    }

    updateWithUserInfo(user_info) {
        this.user_info = user_info;


    }
}