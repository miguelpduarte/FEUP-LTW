export class Story {
    constructor(story_data) {
        this.content_loaded = !!story_data.content;
        this.data = story_data;
    }

    setDomElement(dom_element) {
        this.element = dom_element;
    }

    renderCard() {
        let article = document.createElement("article");
        article.classList.add("story-card");
        article.id = `story_${this.data.story_id}`;
        article.innerHTML = `
            <h1><a href="story.php?id=${this.data.story_id}">${this.data.title}</a></h1>
            <h2><a href="user.php?id=${this.data.author_id}">${this.data.author_name}</a></h2>
        `;

        article.onclick = () => {this.toggleCardOpen()};

        return article;
    }

    toggleCardOpen() {
        if (this.element.classList.contains("open")) {
            this.element.classList.remove("open");
        } else {
            this.element.classList.add("open");
        }
    }

    renderOpenCard() {
        let article = document.createElement("article");
        article.classList.add("story-card");
        article.id = `story_${this.data.story_id}`;
        article.innerHTML = `
            <h1><a href="story.php?id=${this.data.story_id}">${this.data.title}</a></h1>
            <h2><a href="user.php?id=${this.data.author_id}">${this.data.author_name}</a></h2>
        `;

        return article;
    }

    renderFull() {
        let section = document.createElement('section');
        section.id = `story_${this.data.story_id}`;
        section.className = "full-story";
        section.innerHTML = `
            <h1>${this.data.title}</h1>
            <p>${this.data.content}</p>
            <p>TODO: Markdownify the previous p</p>
        `;

        return section;
    }
}