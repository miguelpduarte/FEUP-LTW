import { fetchVoteStory, fetchUnvoteStory } from "../../fetch_actions/stories_fetch_actions.js";
import { fetchChannelData } from "../../fetch_actions/channel_fetch_actions.js";
import { isUserLoggedIn, VoteStatus } from "../../store.js";

export class GenericStory {
	constructor() {
		if (new.target === GenericStory) {
			throw new TypeError("new of abstract class GenericStory");
		}
        
		// Initial voting state
		this.vote_status = VoteStatus.none;
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
    
	updateScore(new_score) {
		this.data.score = new_score;
		this.element.querySelectorAll(".score").forEach(el => el.textContent = this.data.score);
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
    
	async fetchChannelInfo(el) {
		try {
			this.channel_info = await fetchChannelData(this.data.channel);
	
			const channel_info_elem = document.createElement("div");
			channel_info_elem.classList.add("channel-info");
			channel_info_elem.innerHTML = `<a href="channel.php?id=${this.channel_info.channel_id}"></a>`;
	
			el.prepend(channel_info_elem);
			const channel_link = channel_info_elem.querySelector("a");
			channel_link.textContent = `#${this.channel_info.name}`;
			channel_link.style.color = this.channel_info.color;
		} catch (e) {
			return;
		}	
	}
}