import { MarkdownEditor } from "./MarkdownEditor.js";
import { whitespaceString } from "../utils.js";
import { errorHandler } from "../ErrorHandler.js";
import { fetchPostComment, fetchPostSubComment } from "../fetch_actions/comments_fetch_actions.js"

export class CommentForm {
    constructor(id, subComment) {
        this.subComment = subComment;
        this.id = id;
    }

    render() {
        this.section = document.createElement("section");
		this.section.classList.add("comment-form");
        
		this.createForm();
		this.createButton();
		this.createMsgUser();
        
		this.form.appendChild(this.msgSection);
		this.form.appendChild(this.button);
		this.section.appendChild(this.form);

		return this.section;
    }

    createMsgUser() {
		this.msgSection = document.createElement("div");
		this.msgSection.classList.add("msg-field");
	}

	createButton() {
		this.button = document.createElement("button");
		this.button.classList.add("submit-button");
		this.button.value = "submit";
		this.button.innerHTML = "Post";

		this.button.addEventListener("click", (e) => {
			e.preventDefault(); 
			this.submit();
		});
	}

	async submit() {
		let response;
		let content = this.markdown_editor.getContent();

		if(!this.fieldsAreValid(content))
			return;
        
		try {
            if(this.subComment !== undefined) {
                response = await fetchPostSubComment(this.id, content);
            }
            else {
                response = await fetchPostComment(this.id, content);
            }
		} catch (error) {
			const err = errorHandler.getError(error);
			this.showErrorMessage(err.msg);
			err.defaultAction();
			return ;
		}
		window.location.reload();

	}

	fieldsAreValid(content) {
		if (whitespaceString(content)) {
			this.showErrorMessage("The comment's content is empty");
			return false;
		}        
		return true;
	}

	showErrorMessage(err_msg) {
		this.section.querySelector(".msg-field").textContent = "Error: " + err_msg;
		this.section.classList.add("invalid");
	}

	createForm() {
		this.form = document.createElement("form");
		this.form.classList.add("editor");
		this.form.method = "post";
		this.form.action = "/api/comment.php";

		this.markdown_editor = new MarkdownEditor();
		this.form.appendChild(this.markdown_editor.render());
	}
}