import { Story } from "./story.js";

let stories = [];
let stories_data = null;

const fetchStories = () => {
    fetch("/api/story.php")
        .then(res => res.json())
        .then(data => {
            //Check for data errors here
            stories_data = data;
            populateStories();
    });
};

const populateStories = () => {
    const stories_container = document.getElementById("stories_container");
    
    for(const story_data of stories_data) {
        const story = new Story(story_data);
        stories.push(story);
        let story_card = story.renderCard();
        story.setDomElement(story_card);
        stories_container.appendChild(story_card);
    }
}

const clearStories = () => {
    const stories_container = document.getElementById("stories_container");

    while (stories_container.firstChild) {
        stories_container.removeChild(stories_container.firstChild);
    }

    stories = [];
    stories_data = null;
};

const refreshStories = () => {
    clearStories();
    fetchStories();
};

// This runs as the file is loaded from here down

document.getElementById('refresh_stories').onclick = refreshStories;

fetchStories();