import { MarkdownEditor } from "./markdown_editor.js";
import { fetchPostStory }  from "./stories_fetch_actions.js";

export class StoryForm {
    constructor() {
        this.section = null;
        this.form = null;
        this.markdown_editor = null;
        this.button = null;
    }

    render() {
        this.section = document.createElement('section');
        this.section.classList.add('story-form');
        this.createForm();
        this.createButton();
        this.form.appendChild(this.button);
        this.section.appendChild(this.form);

        return this.section;
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.classList.add("submit-button");
        this.button.value = 'submit';
        this.button.innerHTML = 'Post';

        this.button.addEventListener('click', (e) => {
            e.preventDefault(); 
            this.submit()
        });
    }

    async submit() {

        let postBody = this.markdown_editor.getData();
        postBody['title'] = this.form.getElementsByTagName('input')[0].value;
        let response;
        try {
            response = await fetchPostStory(postBody);
        } catch (error) {
            // TODO: Check error.
            console.log(error);
            return ;
        }
        window.location.href = `/pages/story.php?id=${response.story_id}`;

    }

    createForm() {
        this.form = document.createElement('form');
        this.form.classList.add("new-story")
        this.form.method = `post`;
        this.form.action = `/api/story.php`;
        this.form.innerHTML = `<section class="title-area">
                                    <input type="text" id="title" name="title" placeholder="Insert your title here"></textarea>
                                </section>
                                <section class="editor"></section>`;

        this.markdown_editor = new MarkdownEditor();
        this.form.getElementsByClassName('editor')[0].appendChild(this.markdown_editor.render());
    }
}