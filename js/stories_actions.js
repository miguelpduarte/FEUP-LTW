import { Story } from "./story.js";

export const loadStories = () => {
    fetch("/api/story.php")
        .then(res => res.json())
        .then(data => {
            const stories_container = document.getElementById("stories_container");
    
            for(const element of data) {
                stories_container.appendChild(Story.render_short(element));
            }
    });
};

export const clearStories = () => {
    const stories_container = document.getElementById("stories_container");

    while (stories_container.firstChild) {
        stories_container.removeChild(stories_container.firstChild);
    }
};

export const refreshStories = () => {
    clearStories();
    loadStories();
};

loadStories();

document.getElementById('refresh_stories').onclick = refreshStories;