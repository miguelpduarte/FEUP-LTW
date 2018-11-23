import { StoryForm } from "./story_form.js";
let story_form = null;

const createStoryForm = () => {
    const story_form_container = document.getElementById("story_form_container");
    story_form = new StoryForm();
    story_form_container.appendChild(story_form.render());
}

const clearStoryForm = () => {
    const story_form_container = document.getElementById("story_form_container");

    while (story_form_container.firstChild) {
        story_form_container.removeChild(story_form_container.firstChild);
    }
};

const clearForm = () => {
    clearStoryForm();
    createStoryForm();
}

createStoryForm();

document.getElementById('clear_button').onclick = clearForm;
