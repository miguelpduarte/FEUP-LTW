import { fetchStory } from "./fetch_actions.js";
import { mdToHTML } from "./utils.js";

export class Story {
    constructor(story_data) {
        this.content_loaded = !!story_data.content;
        this.data = story_data;
        this.isOpen = false;
    }

    setDomElement(dom_element) {
        this.element = dom_element;
    }

    renderCard() {
        let article = document.createElement("article");
        article.classList.add("story-card");
        article.id = `story_${this.data.story_id}`;
        article.innerHTML = `
            <section class="story-card-info">
                <div class="story-card-score">${this.data.score}</div>
                <h1><a href="story.php?id=${this.data.story_id}">${this.data.title}</a></h1>
                <h2>Author: <a href="user.php?id=${this.data.author_id}">${this.data.author_name}</a></h2>
            </section>
            <section class="story-card-content">Loading...</section>
        `;

        article.onclick = () => {this.toggleCardOpen()};

        return article;
    }

    // growDiv() {
    //     var growDiv = document.getElementById('grow');
    //     if (growDiv.clientHeight) {
    //         growDiv.style.height = 0;
    //     } else {
    //         growDiv.style.height = growDiv.scrollHeight+'px';
    //     }
    // }

    async toggleCardOpen() {
        if(!this.content_loaded) {
            this.element.classList.add("loading");
            await this.addCardContent();
            this.element.classList.remove("loading");
        }

        let card_content = this.element.getElementsByClassName('story-card-content')[0];

        if (this.isOpen) {
            this.element.classList.remove("open");
            card_content.style.height = 0;
            this.isOpen = false;
        } else {
            this.element.classList.add("open");
            card_content.style.height = card_content.scrollHeight+"px";
            this.isOpen = true;
        }
    }

    async addCardContent() {
        const story_data = await fetchStory(this.data.story_id);
        this.data = story_data;

        this.element.getElementsByClassName('story-card-content')[0].innerHTML = mdToHTML(this.data.content);
        this.content_loaded = true;
    }

    renderFull() {
        let section = document.createElement('section');
        section.id = `story_${this.data.story_id}`;
        section.className = "full-story";
        section.innerHTML = `
            <h1>${this.data.title}</h1>
            <hr/>
            <div class="md-content">${mdToHTML(this.data.content)}</div>
        `;

        return section;
    }
}