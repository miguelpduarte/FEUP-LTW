import { mdToHTML } from "./utils.js";

export class MarkdownEditor {
    constructor() {
        this.editor = null;
    }

    render() {
        this.editor = document.createElement('section');
        this.editor.classList.add('editor');
        this.editor.innerHTML = `<textarea id="title" name="title" rows="32" cols="64"></textarea>
                                <section class="preview"></section>`;

        let reload = this.updatePreview.bind(this);
        this.editor.getElementsByTagName('textarea')[0].addEventListener('input', reload);
        return this.editor;
    }

    updatePreview() {
        let mardown = this.editor.getElementsByTagName('textarea')[0].value;
        this.editor.getElementsByClassName('preview')[0].innerHTML = `${mdToHTML(mardown)}`;
    }
}