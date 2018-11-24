"use strict";

import { Navbar } from "./Navbar.js";

let navbar_obj = null;

const initNavbar = () => {
    const navbar_container = document.getElementById("navbar_container");
    navbar_obj = new Navbar();
    const rendered_navbar = navbar_obj.render();
    navbar_container.appendChild(rendered_navbar);
};

const checkForUserLogin = () => {
    console.log("TODO: Check for user login on navbar controller load");
};

// This runs as the file is loaded from here down

initNavbar();
checkForUserLogin();