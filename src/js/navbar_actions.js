"use strict";

import { Navbar } from "./Navbar.js";

let navbar = null;

const initNavbar = () => {
    const navbar_container = document.getElementById("navbar_container");
    navbar = new Navbar();
    const rendered_navbar = navbar.render();
    navbar_container.appendChild(rendered_navbar);
};

const checkForUserLogin = () => {
    console.log("TODO: Check for user login on navbar controller load");
};

// This runs as the file is loaded from here down

initNavbar();
checkForUserLogin();