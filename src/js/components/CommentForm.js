import { MarkdownEditor } from "./MarkdownEditor.js";
import { whitespaceString } from "../utils.js";
import { errorHandler } from "../ErrorHandler.js";
import { Comment } from "./Comment.js";
import { fetchPostComment, fetchPostSubComment } from "../fetch_actions/comments_fetch_actions.js";

export class CommentForm {
	constructor(id, subComment) {
		this.subComment = subComment;
		this.id = id;
	}

	setParentSection(parent_section) {
		this.parent_section = parent_section;
	}

	render() {
		this.div = document.createElement("div");
		this.div.classList.add("comment-form");
        
		this.createForm();
		this.createButton();
		this.createMsgUser();
        
		this.form.appendChild(this.msgSection);
		this.form.appendChild(this.button);
		this.div.appendChild(this.form);

		return this.div;
	}

	createMsgUser() {
		this.msgSection = document.createElement("div");
		this.msgSection.classList.add("msg-field");
	}

	createButton() {
		this.button = document.createElement("button");
		this.button.classList.add("submit-button");
		this.button.value = "submit";
		this.button.textContent = "Post";

		this.button.addEventListener("click", (e) => {
			e.preventDefault(); 
			this.submit();
		});
	}

	async submit() {
		let response;
		let content = this.markdown_editor.getContent();

		if (!this.fieldsAreValid(content))
			return;
        
		try {
			if (this.subComment !== undefined) {
				
				response = await fetchPostSubComment(this.id, content);
				this.appendLocalSubComment(response);
			}
			else {
				response = await fetchPostComment(this.id, content);
				this.appendLocalComment(response);
				this.parent_section.signalNewLocalComment();
			}
		} catch (error) {
			const err = errorHandler.getError(error);
			this.showErrorMessage(err.msg);
			err.defaultAction();
			return ;
		}
		this.form.reset();

	}

	fieldsAreValid(content) {
		if (whitespaceString(content)) {
			this.showErrorMessage("The comment's content is empty");
			return false;
		}

		return true;
	}

	showErrorMessage(err_msg) {
		this.div.querySelector(".msg-field").textContent = "Error: " + err_msg;
		this.div.classList.add("invalid");
	}

	createForm() {
		this.form = document.createElement("form");
		this.form.classList.add("editor");
		this.form.method = "post";
		this.form.action = "../api/comment.php";

		this.markdown_editor = new MarkdownEditor();
		this.form.appendChild(this.markdown_editor.render());
	}

	appendLocalComment(response) {
		const commentData = {
			comment_id: response.data.comment_id,
			author: response.data.author,
			score: response.data.score,
			content: response.data.content,
			created_at: response.data.created_at,
		};
		const newComment = new Comment(commentData, false);
		const rendered_newComment = newComment.render();
		rendered_newComment.classList.add("local-comment");
		document.querySelector(".local-comments").prepend(rendered_newComment);
	}

	appendLocalSubComment(response) {
		const commentData = {
			comment_id: response.data.comment_id,
			author: response.data.author,
			score: response.data.score,
			content: response.data.content,
			created_at: response.data.created_at,
		};

		const newComment = new Comment(commentData, false);
		const rendered_newComment = newComment.render();
		rendered_newComment.classList.add("local-subcomment");
		document.querySelector(`#comment_${this.id} .local-subcomments`).prepend(rendered_newComment);
	}
}