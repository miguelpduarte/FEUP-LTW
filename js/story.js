export class Story {
    static render_short(story_data) {
        let article = document.createElement('article');
        article.classList.add("story-card");
        article.id = `story_${story_data.story_id}`;
        article.innerHTML = `
            <h1><a href="story.php?id=${story_data.story_id}">${story_data.title}</a></h1>
            <h2><a href="user.php?id=${story_data.author_id}">${story_data.author_name}</a></h2>
        `;

        return article;
    }

    static render_full(story_data) {
        let section = document.createElement('section');
        section.id = `story_${story_data.story_id}`;
        section.className = "full-story";
        section.innerHTML = `
            <h1>${story_data.title}</h1>
            <p>${story_data.content}</p>
            <p>TODO: Markdownify the previous p</p>
        `;

        return section;
    }
}