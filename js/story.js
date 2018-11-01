export class Story {
    setData(story_data) {
        this.data = story_data;
    }

    render(parent_elem) {
        let base = document.createElement('div');
        base.className = "story-item";
        base.innerHTML = `
            <h3>${this.data.title}</h3>
            <h4>${this.data.content}</h4>
        `;

        parent_elem.appendChild(base);
    }
}