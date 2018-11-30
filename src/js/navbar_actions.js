"use strict";

import { Navbar } from "./Navbar.js";
import { getUserInfo, isUserLoggedIn } from "./store.js";

let navbar = null;

const initNavbar = () => {
    const navbar_container = document.getElementById("navbar_container");
    navbar = new Navbar();
    const rendered_navbar = navbar.render();
    navbar_container.appendChild(rendered_navbar);
};

const checkForUserLogin = async () => {
    if (await isUserLoggedIn()) {
        navbar.updateWithUserInfo(await getUserInfo());
    }
};

// This runs as the file is loaded from here down

initNavbar();
checkForUserLogin();