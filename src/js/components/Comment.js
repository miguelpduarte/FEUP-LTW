"use strict";

import { fetchSubComments } from "../fetch_actions/comments_fetch_actions.js";
import { mdToHTML } from "../utils.js";
import { CommentForm } from "./CommentForm.js";

export class Comment {
	constructor(data, hasForm) {
		this.hasForm = hasForm;
		this.comment_id = data.comment_id;
		this.author_id = data.author;
		this.author_name = data.author_name;
		this.score = data.score;
		this.content = data.content;
		this.created_at = data.created_at;

		this.n_comments_loaded = 0;
		this.subComments = [];

		if (data.nested_comments) {
			this.n_comments_loaded = data.nested_comments.length;
			this.subComments = data.nested_comments.map(comment => {
				return new Comment(comment);
			});
		}

		this.section = null;
		this.loading = false;
	}

	render() {
		this.section = document.createElement("section");
		this.section.classList.add("comment-container");
		this.section.id = `comment_${this.comment_id}`;

		this.section.innerHTML =
		`<section class="comment">
			<div class="comment-card-info">
				<div class="md-content">${mdToHTML(this.content)}</div>
				<div class="comment-card-details">
					<span class="author"><a href="user.php?id=${this.author_id}"></a></span>
					<i class="fas fa-user-clock"></i>
					<span class="date">${moment(this.created_at).fromNow()}</span>
				</div>
			</div>
			<div class="voting-wrapper">
				<i class="vote-up fas fa-chevron-up"></i>
				<div class="score">${this.score}</div>
				<i class="vote-down fas fa-chevron-down"></i>
			</div>
		</section>`;
    
		this.section.querySelector(".author > a").textContent += this.author_name;
		if (this.hasForm) {
			this.create_form_area();
			this.section.appendChild(this.form_area);
		}

		if (this.subComments.length) {
			const subcomment_section = document.createElement("section");
			subcomment_section.classList.add("subcomment-container");

			for (const nComment of this.subComments) {
				subcomment_section.appendChild(nComment.render());
			}

			this.section.appendChild(subcomment_section);
			this.section.innerHTML += `<a class="expand-comments" data-id=${this.comment_id}>Expand Comments</a>`;
			this.section.querySelector('.expand-comments').addEventListener("click", () => this.loadMoreComments(5));
		}	

		if(this.hasForm) {
			this.section.querySelector('.show-repply').addEventListener("click", () => this.showForm());
		}

		return this.section;
	}

	create_form_area() {
		this.form_area = document.createElement("section");
		this.form_area.classList.add("new-subcomment");
		this.form_area.innerHTML =`<a class="show-repply">Reply</a>`;
	}

	showForm() {
		this.commentForm = new CommentForm(this.comment_id, true);
		this.section.querySelector(".new-subcomment").removeChild(this.section.querySelector(".show-repply"));
		this.section.querySelector(".new-subcomment").append(this.commentForm.render());
	}

	async loadMoreComments(n_comments) {
		if (this.loading) {
			return;
		}

		this.loading = true;
		this.section.removeChild(this.section.querySelector(".expand-comments"));

		// Append loading message
		const loadingWheel = document.createElement("p");
		loadingWheel.innerHTML = "Loading comments...";
		this.section.appendChild(loadingWheel);

		const comment_data = await fetchSubComments(this.comment_id, n_comments, this.n_comments_loaded);

		this.addComments(comment_data);

		if (comment_data.length) {
			this.section.innerHTML += `<a class="expand-comments" data-id=${this.comment_id}>Expand Comments</a>`;
			this.section.lastChild.addEventListener("click", () => this.loadMoreComments());
		}

		this.loading = false;
	}

	setScore(score) {
		this.score = score;
	}

	addComments(comment_data) {
		this.section.removeChild(this.section.lastChild);

		// Append comments
		if (!comment_data || !comment_data.length) {
			this.loading = false;
			return;
		}

		this.n_comments_loaded += comment_data.length;
		
		for (const nComment of comment_data) {
			let newComment = new Comment(nComment);
			this.subComments.push(newComment);
			this.section.querySelector(".subcomment-container").appendChild(newComment.render());
		}
	}
}
