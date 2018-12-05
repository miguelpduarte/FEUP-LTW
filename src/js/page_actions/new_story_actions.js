import { StoryForm } from "../components/StoryForm.js";
let story_form = null;

const createStoryForm = () => {
	const story_form_container = document.getElementById("story_form_container");
	story_form = new StoryForm();
	story_form_container.appendChild(story_form.render());
};

createStoryForm();