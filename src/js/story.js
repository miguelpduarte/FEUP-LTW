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
            <section class="story-card-header">
                <div class="story-card-info">
                    <h1 class="title"><a href="story.php?id=${this.data.story_id}">${this.data.title}</a></h1>
                    <div class="story-card-details">
                        <span class="author"><a href="user.php?id=${this.data.author_id}">${this.data.author_name}</a></span>
                        <span class="date">${moment(this.data.created_at).fromNow()}</span>
                    </div>
                </div>
                <div class="voting-wrapper">
                    <div class="score">${this.data.score}</div>                    
                    <div class="voting">
                        <div class="vote-up">^</div>
                        <div class="score">${this.data.score}</div>
                        <div class="vote-down">v</div>
                    </div>
                </div>
            </section>
            <div class="content-wrapper">
                <section class="content">${(this.content_loaded ? this.data.content : "Loading...")}</section>
            </div>
        `;

        article.onclick = (e) => {
            //To ensure that clicking on the story or user link does not attempt to open or close the card
            if(e.target.tagName !== 'A') {
                this.toggleCardOpen();
            }
        };

        

        const card_content_wrapper = article.getElementsByClassName("content-wrapper")[0];
        card_content_wrapper.addEventListener("transitionend", (_event) => {
            this.resizeCardContentWrapper(card_content_wrapper);
        });

        return article;
    }

    resizeCardContentWrapper(card_content_wrapper) {
        if (this.isOpen && this.card_content_wrapper_calc_height && this.card_content_wrapper_calc_height !== card_content_wrapper.scrollHeight) {
            card_content_wrapper.style.height = card_content_wrapper.scrollHeight+"px";
            this.card_content_wrapper_calc_height = card_content_wrapper.scrollHeight;
        }
    }

    async toggleCardOpen() {
        if(!this.content_loaded) {
            this.element.classList.add("loading");
            await this.addCardContent();
            this.element.classList.remove("loading");
        }

        const card_content_wrapper = this.element.getElementsByClassName("content-wrapper")[0];

        if (this.isOpen) {
            this.element.classList.remove("open");
            card_content_wrapper.style.height = 0;
            this.isOpen = false;
        } else {
            this.element.classList.add("open");
            card_content_wrapper.style.height = card_content_wrapper.scrollHeight+"px";
            this.card_content_wrapper_calc_height = card_content_wrapper.scrollHeight;
            this.isOpen = true;
        }
    }

    async addCardContent() {
        const story_data = await fetchStory(this.data.story_id);
        this.data = story_data;

        this.element.getElementsByClassName('content')[0].innerHTML = mdToHTML(this.data.content);
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