"use strict";

import { mdToHTML } from "../utils.js";
import { VoteStatus, isUserLoggedIn } from "../store.js";
import { fetchUnvoteComment, fetchVoteComment, fetchSubComments } from "../fetch_actions/comments_fetch_actions.js";

export class Comment {
	constructor(data) {
		this.comment_id = data.comment_id;
		this.author_id = data.author;
		this.author_name = data.author_name;
		this.score = parseInt(data.score);
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
					<span class="author"><a href="user.php?username=${this.author_name}"></a></span>
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
    
		this.element.querySelector(".author > a").textContent = this.author_name;

		if (this.subComments.length) {
			const subcomment_section = document.createElement("section");
			subcomment_section.classList.add("subcomment-container");

			for (const nComment of this.subComments) {
				subcomment_section.appendChild(nComment.render());
			}

			this.element.appendChild(subcomment_section);
			this.element.innerHTML += `<a class="expand-comments" data-id=${this.comment_id}>Expand Comments</a>`;
			this.element.lastChild.addEventListener("click", (evt) => this.loadMoreComments(evt));
		}

		// Upvoting
		this.element.querySelector(`#comment_${this.comment_id} > .comment .vote-up`).addEventListener("click", e => {
			e.stopPropagation();
			this.upvote();
		});

		// Downvoting
		this.element.querySelector(`#comment_${this.comment_id} > .comment .vote-down`).addEventListener("click", e => {
			e.stopPropagation();
			this.downvote();
		});

		return this.element;
	}

	async loadMoreComments() {
		if (this.loading) {
			return;
		}

		this.loading = true;
		this.section.removeChild(this.section.lastChild);

		// Append loading message
		const loadingWheel = document.createElement("p");
		loadingWheel.innerHTML = "Loading comments...";
		this.section.appendChild(loadingWheel);

		const comment_data = await fetchSubComments(this.comment_id, 5, this.n_comments_loaded);

		this.addComments(comment_data);

		if (comment_data.length) {
			this.section.innerHTML += `<a class="expand-comments" data-id=${this.comment_id}>Expand Comments</a>`;
			this.section.lastChild.addEventListener("click", () => this.loadMoreComments());
		}

		this.loading = false;
	}

	// Should only be called internally
	setVoteStatus(new_vote_status) {
		this.vote_status = new_vote_status;

		// Switching classes
		switch (new_vote_status) {
			case VoteStatus.upvoted:
				this.element.classList.add("upvoted");
				this.element.classList.remove("downvoted");
				break;
			case VoteStatus.downvoted:
				this.element.classList.remove("upvoted");
				this.element.classList.add("downvoted");
				break;
			case VoteStatus.none:
				this.element.classList.remove("upvoted");
				this.element.classList.remove("downvoted");
				break;
			default:
				console.warn("Wrong call to Story.setVoteStatus!");
				break;
		}
	}

	updateScore(new_score) {
		this.score = new_score;
		this.element.querySelectorAll(`#comment_${this.comment_id} > .comment .score`).forEach(el => el.textContent = this.score);
	}

	async upvote() {
		// If user is not logged in, then redirect to login page
		if (!await isUserLoggedIn()) {
			window.location.href = "/pages/login.php";
			return;
		}

		if (this.vote_status === VoteStatus.upvoted) {
			// Unvote
			try {
				const res = await fetchUnvoteComment(this.comment_id);
				console.log("Comment remove upvote successful");
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
				console.log("Comment upvote successful");
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
			window.location.href = "/pages/login.php";
			return;
		}

		if (this.vote_status === VoteStatus.downvoted) {
			// Unvote
			try {
				const res = await fetchUnvoteComment(this.comment_id);
				console.log("Story remove downvote successful");
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
