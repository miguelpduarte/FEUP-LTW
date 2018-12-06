import { mdToHTML } from "../utils.js";

export class MarkdownEditor {
	render() {
		this.editor = document.createElement("section");
		this.editor.classList.add("md-editor");
		this.editor.innerHTML = `
        <input id="editor_tab" type="radio" name="tab-selector" class="tab-selector" checked>
        <label for="editor_tab" class="tab-label">Editor</label>

        <input id="preview_tab" type="radio" name="tab-selector" class="tab-selector">
        <label for="preview_tab"class="tab-label">Preview</label>

        <textarea id="editor" name="editor-tab" class="editor tab"></textarea>
        <section id="preview" class="preview tab"></section>`;

		this.updatePreview();
		this.editor.querySelector("textarea").addEventListener("input", () => this.updatePreview());
        
		return this.editor;
	}

	updatePreview() {
		const markdown = this.editor.querySelector("textarea").value;
		this.editor.querySelector(".preview").innerHTML = mdToHTML(markdown);
	}

	getContent() {
		return this.editor.querySelector("textarea").value;
	}
}