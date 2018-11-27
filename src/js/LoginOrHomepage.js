export class LoginOrHomepage {
    constructor() {

    }

    render() {
        let base_elem = document.createElement("div");
        base_elem.id = "login_or_homepage";

        base_elem.innerHTML = `
            <h1>Account registered successfully!</h1>
            <h2>You may now login with your account!</h2>
            <ul>
                <li><a href="/pages/stories.php">Homepage</a></li>
                <li><a href="/pages/login.php">Login</a></li>
            </ul>
        `;

        // Storing associated DOM Element for further use (if need be)
        this.element = base_elem;

        return base_elem;
    }
}