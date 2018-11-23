import { MarkdownEditor } from "./markdown_editor.js";
import { fetchPostStory }  from "./fetch_actions.js";

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
        this.section.appendChild(this.form);
        this.section.appendChild(this.button);

        return this.section;
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.value = 'submit';
        this.button.innerHTML = 'Post';

        const submit = this.submit.bind(this);
        this.button.addEventListener('click', submit);
    }

    submit() {
        let postBody = this.markdown_editor.getData();
        postBody['title'] = this.form.getElementsByTagName('input')[0].value;
        console.log(postBody);
        try {
            fetchPostStory(postBody);
        } catch (err) {
            console.dir(err);
        }
    }

    createForm() {
        this.form = document.createElement('form');
        this.form.id = `new_strory`;
        this.form.method = `post`;
        this.form.action = `/api/story.php`;
        this.form.innerHTML = `<section class="title-area">
                                    <input type="text" id="title" name="title" rows="1" cols="64"></textarea>
                                </section>
                                <section class="markdown-editor"></section>`;

        this.markdown_editor = new MarkdownEditor();
        this.form.getElementsByClassName('markdown-editor')[0].appendChild(this.markdown_editor.render());
    }
}