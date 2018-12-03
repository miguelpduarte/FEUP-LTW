import { MarkdownEditor } from "./markdown_editor.js";
import { fetchPostStory }  from "./stories_fetch_actions.js";
import { errorHandler } from "./ErrorHandler.js";
import { whitespaceString } from "./utils.js";


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
        this.createMsgUser();
        this.form.appendChild(this.msgSection);
        this.form.appendChild(this.button);
        this.section.appendChild(this.form);

        return this.section;
    }

    createMsgUser() {
        this.msgSection = document.createElement('div');
        this.msgSection.classList.add('msg-field');

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
        let response;
        let content = this.markdown_editor.getData().content;
        let title  = this.form.getElementsByTagName('input')[0].value;

        if(!this.fieldsAreValid(content, title))
            return;
        
        try {                
            response = await fetchPostStory(content, title);
        } catch (error) {
            const err = errorHandler.getError(error);
            this.showErrorMessage(err.msg)
            err.defaultAction();
            return ;
        }
        window.location.href = `/pages/story.php?id=${response.story_id}`;

    }

    fieldsAreValid(content, title) {
        if (whitespaceString(content)) {
            this.showErrorMessage("The story's content is empty");
            return false;
        }

        if (whitespaceString(title)) {
            this.showErrorMessage("The story's title is empty");
            return false;
        }
        
        return true;
    }

    showErrorMessage(err_msg) {
        this.section.querySelector(".msg-field").textContent = "Error: " + err_msg;
        this.section.classList.add("invalid");
    }

    createForm() {
        this.form = document.createElement('form');
        this.form.classList.add("new-story");
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