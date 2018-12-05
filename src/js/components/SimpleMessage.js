export class SimpleMessage {
	constructor(title, subtitle, links) {
		this.title = title;
		this.subtitle = subtitle;
		// Links should be an array of objects with keys href and text
		this.links = links;
	}

	render() {
		let base_elem = document.createElement("div");
		base_elem.id = "simple_success_message";

		base_elem.innerHTML = `
            <h1></h1>
            <h2></h2>
            <ul>
            </ul>
        `;

		base_elem.querySelector("h1").textContent = this.title;
		base_elem.querySelector("h2").textContent = this.subtitle;

		const links_list_ul = base_elem.querySelector("ul");

		for (const link of this.links) {
			const curr_link_li = document.createElement("li");
			const curr_link_a = document.createElement("a");
			curr_link_a.href = link.href;
			curr_link_a.textContent = link.text;
			// The a goes inside the li
			curr_link_li.appendChild(curr_link_a);
			// Which goes inside the ul
			links_list_ul.appendChild(curr_link_li);
		}

		// Storing associated DOM Element for further use (if need be)
		this.element = base_elem;

		return base_elem;
	}
}