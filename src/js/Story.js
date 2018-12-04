"use strict";

import { fetchStory } from "./stories_fetch_actions.js";
import { mdToHTML } from "./utils.js";

const VoteStatus = Object.freeze({
    none: 1,
    upvoted: 2,
    downvoted: 3,
});

export class Story {
    constructor(story_data) {
        this.content_loaded = !!story_data.content;
        this.data = story_data;
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
                        <span class="author"><a href="user.php?id=${this.data.author_id}"></a></span>
                        <i class="fas fa-user-clock"></i>
                        <span class="date">${moment(this.data.created_at).fromNow()}</span>
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
        article.querySelector('.title a').textContent = this.data.title;
        // Author name
        article.querySelector('.story-card-details .author a').textContent = this.data.author_name;
        // Article content
        article.querySelector('.content').innerHTML = this.content_loaded ? mdToHTML(this.data.content) : "Loading...";

        // Adding event listeners

        // Article opening
        article.addEventListener('click', e => {
            //To ensure that clicking on the story or user link does not attempt to open or close the card
            if(e.target.tagName !== 'A') {
                this.toggleCardOpen();
            }
        });

        // Upvoting
        article.querySelector('.vote-up').addEventListener('click', e => {
            e.stopPropagation();
            this.upvote();
        });

        // Downvoting
        article.querySelector('.vote-down').addEventListener('click', e => {
            e.stopPropagation();
            this.downvote();
        });

        // Transition fix because of image loading
        const card_content_wrapper = article.getElementsByClassName("content-wrapper")[0];
        card_content_wrapper.addEventListener("transitionend", (_event) => {
            this.resizeCardContentWrapper(card_content_wrapper);
        });

        // Storing attached DOM element for further use
        this.element = article;

        return article;
    }

    resizeCardContentWrapper(card_content_wrapper) {
        if (this.is_open && this.card_content_wrapper_calc_height && this.card_content_wrapper_calc_height !== card_content_wrapper.scrollHeight) {
            card_content_wrapper.style.height = card_content_wrapper.scrollHeight+"px";
            this.card_content_wrapper_calc_height = card_content_wrapper.scrollHeight;
        }
    }

    //TODO - use setUpvoted
    /**
     * For setting of the initial story state, after getting the user upvotes from the back-end when the user is logged in
     * Should only be called for the user upvotes - if a story was not upvoted nor downvoted then there is no reason to call this method
     * @param {*} isUpvoted If the story was upvoted or not
     */
    setUpvoted(is_upvoted) {
        if (is_upvoted) {
            this.vote_status = VoteStatus.upvoted;
        } else {
            this.vote_status = VoteStatus.downvoted;
        }
    }

    async upvote() {
        // TODO: Dont forget to check if it is upvoted or not (will have to get from backend the list of upvotes and set it dynamically)

        if(this.vote_status === VoteStatus.upvoted) {
            // Unvote
            console.log('Unvoting... TODO: Actually hit endpoint');
            // Remove upvoted class
            this.element.classList.remove("upvoted");
            // Updating state
            this.vote_status = VoteStatus.none;
        } else {
            // Upvote
            console.log('Upvoting! TODO: Actually hit endpoint');
            // Apply upvoted class
            this.element.classList.add("upvoted");
            // Ensuring we are not in two states at the same time (visually)
            if (this.vote_status === VoteStatus.downvoted) {
                this.element.classList.remove("downvoted");
            }
            
            // Updating state
            this.vote_status = VoteStatus.upvoted;
        }

        console.log('Dont forget to update score in front-end after as well');

        // Loading
        // Invoke action
        // Finish loading
        // Do stuff
    }

    async downvote() {
        // TODO: Dont forget to check if it is upvoted or not (will have to get from backend the list of upvotes and set it dynamically)

        if(this.vote_status === VoteStatus.downvoted) {
            // Unvote
            console.log('Unvoting... TODO: Actually hit endpoint');
            // Remove upvoted class
            this.element.classList.remove("downvoted");
        } else {
            // Upvote
            console.log('Downvoting! TODO: Actually hit endpoint');
            // Apply downvoted class
            this.element.classList.add("downvoted");
            // Ensuring we are not in two states at the same time (visually)
            if (this.vote_status === VoteStatus.upvoted) {
                this.element.classList.remove("upvoted");
            }
            
            // Updating state
            this.vote_status = VoteStatus.downvoted;
        }

        console.log('Dont forget to update score in front-end after as well');

        // Loading
        // Invoke action
        // Finish loading
        // Do stuff
    }

    async toggleCardOpen() {
        if(!this.content_loaded) {
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
        }
    }

    async addCardContent() {
        const story_data = await fetchStory(this.data.story_id);
        this.data = story_data;

        this.element.getElementsByClassName('content')[0].innerHTML = mdToHTML(this.data.content);
        this.content_loaded = true;
    }

    renderFull() {
        let section = document.createElement('section');
        section.id = `story_${this.data.story_id}`;
        section.className = "full-story";
        section.innerHTML = `
            <section class="story-header">
                <div class="story-info">
                    <h1 class="title"><a href="story.php?id=${this.data.story_id}"></a></h1>
                    <div class="story-details">
                        <span class="author"><a href="user.php?id=${this.data.author_id}"></a></span>
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

        section.querySelector('.title').textContent = this.data.title;
        // Author name
        section.querySelector('.story-details .author a').textContent = this.data.author_name;

        return section;
    }
}