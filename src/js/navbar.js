class Navbar {
    constructor(navbar_elem) {
        this.element = navbar_elem;
    }

    render() {
        this.element.innerHTML = `
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
    }
}

let navbar_elem = document.getElementById('navbar');
let navbar = new Navbar(navbar_elem);
navbar.render();