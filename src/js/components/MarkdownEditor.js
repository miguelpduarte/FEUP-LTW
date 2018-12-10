import { mdToHTML } from "../utils.js";

export class MarkdownEditor {
	render() {
		this.editor = document.createElement("section");
		this.editor.classList.add("md-editor");
		this.editor.innerHTML = `
        <a class="tab-label editor-selector visible">Editor</a>
        <a class="tab-label preview-selector">Preview</a>

        <textarea id="editor" name="editor-tab" class="tab editor-selector visible"></textarea>
        <section id="preview" class="tab preview-selector"></section>`;

		this.updatePreview();
		this.editor.querySelector("textarea").addEventListener("input", () => this.updatePreview());

		for (const label of this.editor.getElementsByClassName("tab-label")) {
			label.addEventListener("click", () => {
				this.showTab(label.classList[1])
		});	
		}
        
		return this.editor;
	}

	showTab(selectedClass) {
		const tabs = this.editor.getElementsByClassName("tab");
		for (const tab of tabs) {
			if(tab.classList[1] != selectedClass)
				tab.classList.remove("visible");
			else
				tab.classList.add("visible");
		}

		const tab_labels = this.editor.getElementsByClassName("tab-label");
		for (const tab of tab_labels) {
			if(tab.classList[1] != selectedClass)
				tab.classList.remove("visible");
			else
				tab.classList.add("visible");
		}
	}

	updatePreview() {
		const markdown = this.editor.querySelector("textarea").value;
		this.editor.querySelector(".preview-selector.tab").innerHTML = mdToHTML(markdown);
	}

	getContent() {
		return this.editor.querySelector("textarea").value;
	}
}