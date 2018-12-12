"use strict"

export class UserInfo {
    constructor(data) {
        this.name = data.name;
        this.username = data.username;
        this.storyScore = data.storyScore;
        this.commentScore = data.commentScore;
    }

    render() {
        this.element = document.createElement('div');
        this.element.classList.add('user-info');
        this.element.innerHTML = `
            <h2 class="info-username"></h2>
            <h3 class="info-name"></h3>
            <div class="info-scores">
                <p class="info-storyScore"></p>
                <p class="info-commentScore"></p>
            </div>
            <p class="info-bio"> </p>
            `

        this.element.querySelector('.info-name').textContent = this.name;
        this.element.querySelector('.info-username').textContent = this.username;
        this.element.querySelector('.info-storyScore').textContent = this.storyScore;
        this.element.querySelector('.info-commentScore').textContent = this.commentScore;
        this.element.querySelector('.info-bio').textContent = "This is a biohishis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a bio is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a biohis is a bio";
        return this.element;
    }
}