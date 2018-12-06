"use strict";

import { Comment } from "./Comment.js";
import { fetchComments } from "../fetch_actions/stories_fetch_actions.js";
import { reloadCommentsFromMemory } from "../page_actions/story_actions.js";

export class CommentSection {
	constructor(comments_data, story_id) {
		this.story_id = story_id;
		this.n_comments_loaded = comments_data.length;
		this.ids = new Set();
		this.comments = comments_data.map(comment => {
			this.ids.add(comment.comment_id);
			return new Comment(comment);
		});
		this.section = null;
		this.loading = false;
	}

	render() {
		this.section = document.createElement("section");
		this.section.classList.add("comment-section");
		this.section.innerHTML = 
        `<div class="line-container">
            <div class="line"><hr/></div>
            <div class="line-middle">
                Comments
                <i class="far fa-comments"></i>
            </div>
            <div class="line"><hr/></div>
        </div>`;

		for (const comment of this.comments) {
			this.section.appendChild(comment.render());
		}

		document.addEventListener("scroll", () => this.scrollListener());
		return this.section;
	}

	scrollListener() {
		if (this.section === null) return;

		if (
			document.body.scrollHeight <=
            document.documentElement.scrollTop + window.innerHeight &&
            !this.loading
		) {
			this.loadMoreComments();
		}
	}

	async loadMoreComments() {
		if (!this.section || this.loading) {
			return;
		}

		this.loading = true;

		// Append loading message
		let loadingWheel = document.createElement("p");
		loadingWheel.textContent = "Loading comments...";
		this.section.appendChild(loadingWheel);

		// Retrive new comments
		const comment_data = await fetchComments(
			this.story_id,
			10,
			this.n_comments_loaded,
			2,
			0
		);

		this.addComments(comment_data);
	}

	addComments(comment_data) {
		// Remove loading message
		this.section.removeChild(this.section.lastChild);
		let needFullReload = false;
		// Append comments
		if (comment_data == null || comment_data.length == 0) {
			this.loading = false;
			return;
		}

		this.n_comments_loaded += comment_data.length;
		for (const comment of comment_data) {
			if (this.commentLoaded(comment)) {
				needFullReload = true;
			}

			this.ids.add(comment.comment_id);
			let comment_object = new Comment(comment);
			this.comments.push(comment_object);

			if (!needFullReload) {
				this.section.appendChild(comment_object.render());
			}
		}

		if (needFullReload) {
			reloadCommentsFromMemory();
		}

		this.loading = false;
	}

	commentLoaded(new_comment) {
		if (this.ids.has(new_comment.comment_id)) {
			const comment = this.comments.find(com => com.comment_id === new_comment.comment_id);
			comment.setScore(new_comment.score);
			return true;
		}

		return false;
	}
}
