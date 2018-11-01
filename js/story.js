export class Story {
    static render_short(story_data) {
        let base = document.createElement('div');
        base.className = "story-item";
        base.innerHTML = `
            <h3>${story_data.title}</h3>
        `;

        return base;
    }

    static render_full(story_data) {
        let base = document.createElement('div');
        base.className = "full-story";
        base.innerHTML = `
            <h3>${story_data.title}</h3>
            <h4>${story_data.content}</h4>
        `;

        return base;
    }
}