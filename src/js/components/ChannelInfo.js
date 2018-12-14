"use strict";

export class ChannelInfo {
	constructor(data) {
		this.name = data.name;
		this.color = data.color;
	}

	render() {
		this.element = document.createElement("div");
		this.element.classList.add("channel-info");
		this.element.innerHTML = `
            <h2 class="info-name"></h2>  
        `;

        const info_name = this.element.querySelector(".info-name");
        info_name.textContent = this.name;
        info_name.style.borderBottom = '2px solid pink';
		return this.element;
	}
}