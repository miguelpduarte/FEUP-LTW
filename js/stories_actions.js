import { Story } from "./story.js";
import { fetchStories } from "./fetch_actions.js";

let stories = [];

const loadStories = async () => {
    const stories_data = await fetchStories();
    populateStories(stories_data);
}

const populateStories = (stories_data) => {
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
};

const refreshStories = () => {
    clearStories();
    loadStories();
};

// This runs as the file is loaded from here down

document.getElementById('refresh_stories').onclick = refreshStories;

loadStories();