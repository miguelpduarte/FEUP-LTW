class Navbar {
    constructor(navbar_elem) {
        this.element = navbar_elem;
    }

    render() {
        this.element.innerHTML = `
            <span class="logo"><a href="/"><img src="" alt="GET logo"/></a></span>
            <div class="hamburger">
                <ul>
                    <li><a href="/">Stuff</a></li>
                    <li><a href="/pages/channels.php">Channels</a></li>
                    <li><a href="/ipsum.php">Lorem</a></li>
                </ul>
            </div>
        `;
    }
}

let navbar_elem = document.getElementById('navbar');
let navbar = new Navbar(navbar_elem);
navbar.render();