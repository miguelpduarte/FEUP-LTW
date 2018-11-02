import { Story } from "./story.js";
import { getParams } from "./utils.js";

let story_data = null;
let story = null;

const fetchStory = id => {
    let real_id = Number.parseInt(id);

    fetch(`/api/story.php?id=${real_id}`)
        .then(res => res.json())
        .then(data => {
            console.log('Fix story data [0] spaghet maybe in "backend"');
            story_data = data[0];

            createStory();
    });
};

const createStory = () => {
    const story_container = document.getElementById("story_container");
    story = new Story(story_data);
    story_container.appendChild(story.renderFull());
}

const loadCurrentStory = () => {
    let params = getParams();
    fetchStory(params.id);
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