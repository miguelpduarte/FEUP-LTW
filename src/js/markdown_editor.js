import { mdToHTML } from "./utils.js";

export class MarkdownEditor {
    constructor() {
        this.editor = null;
    }

    render() {
        this.editor = document.createElement('section');
        this.editor.classList.add('md-editor');
        this.editor.innerHTML = ` 
                                <input id="editor_tab" type="radio" name="tab-selector" class="tab-selector" checked>
                                <label for="editor_tab" class="tab-label">Editor</label>
                                
                                <input id="preview_tab" type="radio" name="tab-selector" class="tab-selector">
                                <label for="preview_tab"class="tab-label">Preview</label>
                                
                                <textarea id="editor" name="editor-tab" class="editor tab"></textarea>
                                <section id="preview" class="preview tab"></section>
                                `;

        let reload = this.updatePreview.bind(this);
        this.updatePreview();
        this.editor.getElementsByTagName('textarea')[0].addEventListener('input', reload);
        return this.editor;
    }

    updatePreview() {
        let mardown = this.editor.getElementsByTagName('textarea')[0].value;
        this.editor.getElementsByClassName('preview')[0].innerHTML = mdToHTML(mardown);
    }

    getData() {
        return {
            content: this.editor.getElementsByTagName('textarea')[0].value
        };
    }
}