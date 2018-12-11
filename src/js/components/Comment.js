"use strict";

import { mdToHTML } from "../utils.js";
import { VoteStatus, isUserLoggedIn } from "../store.js";
import { fetchUnvoteComment, fetchVoteComment, fetchSubComments } from "../fetch_actions/comments_fetch_actions.js";
import { CommentForm } from "./CommentForm.js";

export class Comment {
	constructor(data, hasForm) {
		this.hasForm = hasForm;
		this.comment_id = data.comment_id;
		this.score = parseInt(data.score);
		this.author = data.author;
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

		this.element = null;
		this.loading = false;

		this.vote_status = VoteStatus.none;
	}

	render() {
		this.element = document.createElement("section");
		this.element.classList.add("comment-container");
		this.element.id = `comment_${this.comment_id}`;

		this.element.innerHTML =
		`<section class="comment">
			<div class="comment-card-info">
				<div class="md-content">${mdToHTML(this.content)}</div>
				<div class="comment-card-details">
					<a class="author" href="user.php?username=${this.author}"></a>
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
    
		this.element.querySelector(".author").textContent = this.author;
		
		if (this.hasForm) {
			const form_area = this.createFormArea();
			this.element.appendChild(form_area);
			this.element.querySelector(".show-reply").addEventListener("click", () => this.showForm());			

			const localSubcomments = document.createElement("section");
			localSubcomments.classList.add("local-subcomments");
			localSubcomments.setAttribute("id", `comment_${this.comment_id}`);
			this.element.appendChild(localSubcomments);
		}

		if (this.subComments.length) {
			const subcomment_section = document.createElement("section");
			subcomment_section.classList.add("subcomment-container");

			for (const nComment of this.subComments) {
				subcomment_section.appendChild(nComment.render());
			}

			this.element.appendChild(subcomment_section);

			const expand_comments = document.createElement("a");
			expand_comments.classList.add("expand-comments");
			expand_comments.textContent = "Expand Comments";
			this.element.appendChild(expand_comments);

			this.element.querySelector(".expand-comments").addEventListener("click", () => this.loadMoreComments(5));
		}

		// console.log("id: ", this.comment_id);

		// Upvoting
		this.element.querySelector(".vote-up").addEventListener("click", () => {
			this.upvote();
		});

		// Downvoting
		this.element.querySelector(".vote-down").addEventListener("click", () => {
			this.downvote();
		});

		return this.element;
	}

	createFormArea() {
		const form_area = document.createElement("section");
		form_area.classList.add("new-subcomment");
		form_area.innerHTML = "<a class=\"show-reply\">Reply  <i class=\"fas fa-comments\"></i></a>";
		return form_area;
	}

	showForm() {
		this.commentForm = new CommentForm(this.comment_id, true);
		this.element.querySelector(".new-subcomment").removeChild(this.element.querySelector(".show-reply"));
		this.element.querySelector(".new-subcomment").append(this.commentForm.render());
	}

	async loadMoreComments(n_comments) {
		if (this.loading) {
			return;
		}

		this.loading = true;
		this.element.removeChild(this.element.querySelector(".expand-comments"));

		// Append loading message
		const loadingWheel = document.createElement("p");
		loadingWheel.textContent = "Loading comments...";
		this.element.appendChild(loadingWheel);

		const comment_data = await fetchSubComments(this.comment_id, n_comments, this.n_comments_loaded);

		this.addComments(comment_data);

		if (comment_data.length) {
			this.element.innerHTML += `<a class="expand-comments" data-id=${this.comment_id}>Expand Comments</a>`;
			this.element.lastChild.addEventListener("click", () => this.loadMoreComments());
		}

		this.loading = false;
	}

	// Should only be called internally
	setVoteStatus(new_vote_status) {
		this.vote_status = new_vote_status;
		const comment = this.element.querySelector(".comment");

		// Switching classes
		switch (new_vote_status) {
			case VoteStatus.upvoted:
				comment.classList.add("upvoted");
				comment.classList.remove("downvoted");
				break;
			case VoteStatus.downvoted:
				comment.classList.remove("upvoted");
				comment.classList.add("downvoted");
				break;
			case VoteStatus.none:
				comment.classList.remove("upvoted");
				comment.classList.remove("downvoted");
				break;
			default:
				console.warn("Wrong call to Story.setVoteStatus!");
				break;
		}
	}

	updateScore(new_score) {
		this.score = new_score;
		this.element.querySelectorAll(`#comment_${this.comment_id} > .comment > .voting-wrapper > .score`).forEach(el => el.textContent = this.score);
	}

	async upvote() {
		// If user is not logged in, then redirect to login page
		if (!await isUserLoggedIn()) {
			window.location.href = "./login.php";
			return;
		}

		if (this.vote_status === VoteStatus.upvoted) {
			// Unvote
			try {
				const res = await fetchUnvoteComment(this.comment_id);
				// Updating state
				this.setVoteStatus(VoteStatus.none);
				// Updating score
				this.updateScore(parseInt(res.score));
			} catch (err) {
				// TODO: Use ErrorHandler
				// const error = errorHandler.getError(err);
				// this.showErrorMessage(error.msg);
				// err.defaultAction();
				// return;
				console.error("Unvote error", err);
			}
		} else {
			// Upvote
			try {
				const res = await fetchVoteComment(this.comment_id, true);
				// Updating state
				this.setVoteStatus(VoteStatus.upvoted);
				// Updating score
				this.updateScore(parseInt(res.score));
			} catch (err) {
				// TODO: Use ErrorHandler
				console.error("Upvote error", err);
			}
		}
	}

	async downvote() {
		// If user is not logged in, then redirect to login page
		if (!await isUserLoggedIn()) {
			window.location.href = "./login.php";
			return;
		}

		if (this.vote_status === VoteStatus.downvoted) {
			// Unvote
			try {
				const res = await fetchUnvoteComment(this.comment_id);
				// Updating state
				this.setVoteStatus(VoteStatus.none);
				// Updating score
				this.updateScore(parseInt(res.score));
			} catch (err) {
				// TODO: Use ErrorHandler
				// const error = errorHandler.getError(err);
				// this.showErrorMessage(error.msg);
				// err.defaultAction();
				// return;
				console.error("Unvote error", err);
			}
		} else {
			// Downvote
			try {
				const res = await fetchVoteComment(this.comment_id, false);
				// Updating state
				this.setVoteStatus(VoteStatus.downvoted);
				// Updating score
				this.updateScore(parseInt(res.score));
			} catch (err) {
				// TODO: Use ErrorHandler
				console.error("Upvote error", err);
			}
		}
	}

	addComments(comment_data) {
		this.element.removeChild(this.element.lastChild);

		// Append comments
		if (!comment_data || !comment_data.length) {
			this.loading = false;
			return;
		}

		this.n_comments_loaded += comment_data.length;
		
		for (const nComment of comment_data) {
			let newComment = new Comment(nComment);
			this.subComments.push(newComment);
			this.element.querySelector(".subcomment-container").appendChild(newComment.render());
			this.removeLocalSubCommentIfExists(newComment.comment_id);
		}

	}

	removeLocalSubCommentIfExists(id) {
		let comment = document.querySelector(`.local-subcomment#comment_${id}`);

		if (comment) {
			comment.remove();
		}
	}
}
