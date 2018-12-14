"use strict";

import { fetchStory, fetchVoteStory, fetchUnvoteStory } from "../fetch_actions/stories_fetch_actions.js";
import { fetchChannelData } from "../fetch_actions/channel_fetch_actions.js";
import { mdToHTML } from "../utils.js";
import { isUserLoggedIn, VoteStatus } from "../store.js";
import { changeName } from "../fetch_actions/user_fetch_actions.js";

export class Story {
	constructor(story_data) {
		this.content_loaded = !!story_data.content;
		this.data = story_data;
		
		// Cast score to int because BE can't do it - so it can be used with incrementing and decrementing
		this.data.score = parseInt(story_data.score);

		this.is_open = false;

		this.vote_status = VoteStatus.none;
	}

	renderTopCard() {
		return null;
	}

	renderCard() {
		let article = document.createElement("article");
		article.classList.add("story-card");
		article.id = `story_${this.data.story_id}`;
		article.innerHTML = `
            <section class="story-card-header">
                <div class="story-card-info">
                    <h1 class="title"><a href="story.php?id=${this.data.story_id}"></a></h1>
                    <div class="story-card-details">
                        <span class="author"><a href="user.php?username=${this.data.author_name}"></a></span>
                        <i class="fas fa-user-clock"></i>
						<span class="date">${moment(this.data.created_at).fromNow()}</span>
						<i class="fas fa-comments"></i>
						<span class="n_comments">${this.data.n_comments}</span>
                    </div>
                </div>
                <div class="voting-wrapper">
                    <div class="score">${this.data.score}</div>                    
                    <div class="voting">
                        <i class="vote-up fas fa-chevron-up"></i>
                        <div class="score">${this.data.score}</div>
                        <i class="vote-down fas fa-chevron-down"></i>
                    </div>
                </div>
            </section>
            <div class="content-wrapper">
                <hr/>
                <section class="content"></section>
            </div>
        `;

		// Adding textContent

		// Article title
		article.querySelector(".title a").textContent = this.data.title;
		// Author name
		article.querySelector(".story-card-details .author a").textContent = this.data.author_name;
		// Article content
		article.querySelector(".content").innerHTML = this.content_loaded ? mdToHTML(this.data.content) : "Loading...";

		// Adding event listeners

		// Article opening
		article.addEventListener("click", e => {
			//To ensure that clicking on the story or user link does not attempt to open or close the card
			if (e.target.tagName !== "A") {
				this.toggleCardOpen();
			}
		});

		// Upvoting
		article.querySelector(".vote-up").addEventListener("click", e => {
			e.stopPropagation();
			this.upvote();
		});

		// Downvoting
		article.querySelector(".vote-down").addEventListener("click", e => {
			e.stopPropagation();
			this.downvote();
		});

		// Transition fix because of image loading
		const card_content_wrapper = article.getElementsByClassName("content-wrapper")[0];
		card_content_wrapper.addEventListener("transitionend", () => {
			this.resizeCardContentWrapper(card_content_wrapper);
		});

		// Storing attached DOM element for further use
		this.element = article;

		const info_elem = this.element.querySelector('.story-card-info');
		this.fetchChannelInfo(info_elem);

		return article;
	}

	resizeCardContentWrapper(card_content_wrapper) {
		if (this.is_open && this.card_content_wrapper_calc_height && this.card_content_wrapper_calc_height !== card_content_wrapper.scrollHeight) {
			card_content_wrapper.style.height = card_content_wrapper.scrollHeight+"px";
			this.card_content_wrapper_calc_height = card_content_wrapper.scrollHeight;
		}
	}

	async fetchChannelInfo(el) {
		this.channel_info = await fetchChannelData(this.data.channel);

		const channel_info_elem = document.createElement('div');
		channel_info_elem.classList.add('channel-info');
		channel_info_elem.innerHTML = `<a href="channel.php?id=${this.channel_info.channel_id}"></a>`

		
		el.prepend(channel_info_elem);
		channel_info_elem.querySelector("a").textContent = `#${this.channel_info.name}`;
		channel_info_elem.style.color = this.channel_info.color;
		
	}

	/**
     * For setting of the initial story state, after getting the user upvotes from the back-end when the user is logged in
     * Should only be called for the user upvotes - if a story was not upvoted nor downvoted then there is no reason to call this method
     * @param {*} isUpvoted If the story was upvoted or downvoted (-1 for downvoted, 1 for upvoted)
     */
	setUpvoted(is_upvoted) {
		if (is_upvoted === 1) {
			this.setVoteStatus(VoteStatus.upvoted);
		} else {
			this.setVoteStatus(VoteStatus.downvoted);
		}
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
		this.data.score = new_score;
		this.element.querySelectorAll(".score").forEach(el => el.textContent = this.data.score);
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
				const res = await fetchUnvoteStory(this.data.story_id);
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
				const res = await fetchVoteStory(this.data.story_id, true);
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
				const res = await fetchUnvoteStory(this.data.story_id);
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
				const res = await fetchVoteStory(this.data.story_id, false);
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

	async toggleCardOpen() {
		if (!this.content_loaded) {
			this.element.classList.add("loading");
			await this.addCardContent();
			this.element.classList.remove("loading");
		}

		const card_content_wrapper = this.element.getElementsByClassName("content-wrapper")[0];

		if (this.is_open) {
			this.element.classList.remove("open");
			card_content_wrapper.style.height = 0;
			this.is_open = false;
		} else {
			this.element.classList.add("open");
			card_content_wrapper.style.height = card_content_wrapper.scrollHeight+"px";
			this.card_content_wrapper_calc_height = card_content_wrapper.scrollHeight;
			this.is_open = true;
			this.element.scrollIntoView({
				behavior: "smooth",
				block: "start", 
				inline: "start"
			});
		}
	}

	async addCardContent() {
		const story_data = await fetchStory(this.data.story_id);
		this.data = story_data;

		this.element.getElementsByClassName("content")[0].innerHTML = mdToHTML(this.data.content);
		this.content_loaded = true;
	}

	renderFull() {
		let section = document.createElement("section");
		section.id = `story_${this.data.story_id}`;
		section.className = "full-story";

		
		section.innerHTML = `
            <section class="story-header">
                <div class="story-info">
                    
                    <h1 class="title"><a href="story.php?id=${this.data.story_id}"></a></h1>
                    <div class="story-details">
                        <span class="author"><a href="user.php?username=${this.data.author_name}"></a></span>
                        <i class="fas fa-user-clock"></i>
                        <span class="date">${moment(this.data.created_at).fromNow()}</span>
                    </div>
                </div>
                <div class="voting-wrapper">
                    <i class="vote-up fas fa-chevron-up"></i>
                    <div class="score">${this.data.score}</div>
                    <i class="vote-down fas fa-chevron-down"></i>
                </div>
            </section>
            <hr/>
            <div class="content">${mdToHTML(this.data.content)}</div>
        `;

		section.querySelector(".title").textContent = this.data.title;
		// Author name
		section.querySelector(".story-details .author a").textContent = this.data.author_name;

		// Upvoting
		section.querySelector(".vote-up").addEventListener("click", e => {
			e.stopPropagation();
			this.upvote();
		});

		// Downvoting
		section.querySelector(".vote-down").addEventListener("click", e => {
			e.stopPropagation();
			this.downvote();
		});

		this.element = section;

		const info_elem = this.element.querySelector('.story-info');
		this.fetchChannelInfo(info_elem);

		this.fetchChannelInfo();
		return section;
	}
}