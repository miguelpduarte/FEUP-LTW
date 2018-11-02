import { Story } from "./story.js";
import { getParams } from "./utils.js";
import { fetchStory } from "./fetch_actions.js";

let story = null;

const createStory = (story_data) => {
    const story_container = document.getElementById("story_container");
    story = new Story(story_data);
    story_container.appendChild(story.renderFull());
}

const loadCurrentStory = async () => {
    let params = getParams();
    const story_data = await fetchStory(params.id);
    createStory(story_data);
};

const clearCurrentStory = () => {
    const story_container = document.getElementById("story_container");

    while (story_container.firstChild) {
        story_container.removeChild(story_container.firstChild);
    }
};

const reloadCurrentStory = () => {
    clearCurrentStory();
    loadCurrentStory();
}

loadCurrentStory();

document.getElementById('refresh_story').onclick = reloadCurrentStory;