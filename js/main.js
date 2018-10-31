class Story {
    constructor(story_data) {
        this.data = story_data;
    }

    render(parent_elem) {
        let base = document.createElement('div');
        base.innerHTML = `
            <h3>${this.data.title}</h3>
            <h4>${this.data.content}</h4>
        `;

        parent_elem.appendChild(base);
    }
}

fetch('/api/story.php')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        const insert_here = document.getElementById('stories_container');

        for(const element of data) {
            let story = new Story(element);
            story.render(insert_here);
        }
    });