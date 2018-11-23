import { MarkdownEditor } from "./markdown_editor.js";

export class StoryForm {
    constructor() {
        this.section = null;
        this.markdown_editor = null;
    }

    render() {
        this.section = document.createElement('form');
        this.section.innerHTML = `<section class="title-area">
                                    <input type="text" id="title" name="title" rows="1" cols="64"></textarea>
                                  </section>
                                  <section class="markdown-editor"></section>`;
        this.markdown_editor = new MarkdownEditor();
        this.section.getElementsByClassName('markdown-editor')[0].appendChild(this.markdown_editor.render());
        return this.section;
    }
}