import { Story } from "./story.js";
import { getParams } from "./utils.js";

const loadStory = id => {
    let real_id = Number.parseInt(id);

    fetch(`/api/story.php?id=${real_id}`)
        .then(res => res.json())
        .then(data => {
            console.log('Fix story data [0] spaghet maybe in "backend"');
            let story_data = data[0];
            const story_container = document.getElementById("story_container");
            story_container.appendChild(Story.render_full(story_data));
    });
};

const loadCurrentStory = () => {
    let params = getParams();
    loadStory(params.id);
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