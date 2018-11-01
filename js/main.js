import { Story } from "./story.js";

const loadStories = () => {
    fetch("/api/story.php")
        .then(res => res.json())
        .then(data => {
            const stories_container = document.getElementById("stories_container");
    
            for(const element of data) {
                let story = new Story();
                story.setData(element);
                story.render(stories_container);
            }
    });
};

const clearStories = () => {
    const stories_container = document.getElementById("stories_container");

    while (stories_container.firstChild) {
        stories_container.removeChild(stories_container.firstChild);
    }
};

const refreshStories = () => {
    clearStories();
    loadStories();
};

loadStories();