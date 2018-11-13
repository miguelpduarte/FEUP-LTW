import {Comment} from './Comment.js';
import { fetchComments } from "./fetch_actions.js";
import {mdToHTML} from './utils.js';

export class CommentSection {
  constructor(comments_data, story_id) {
    this.story_id = story_id;
    this.n_comments_loaded = comments_data.length;
    this.comments = comments_data.map(function(comment) {
      return new Comment(comment);
    });
    this.section = null;
  }

  render() {
    this.section = document.createElement('section');
    this.section.classList.add('comment-section');
    this.section.innerHTML = `<h3>Comments</h3>`;
    for (const comment of this.comments) {
        this.section.appendChild(comment.render());
    }

    this.appendButton();
    return this.section;
  }

  appendButton() {
      if(this.section === null)
        return;
      let button = document.createElement('button');
      button.id = 'expand-comments';
      button.innerText = 'Expand Comments';
      button.addEventListener(`click`, this.loadMoreComments.bind(this));
      this.section.appendChild(button);
    

  }

  async loadMoreComments(event) {
    if(this.section === null)
       return;
    
    this.section.removeChild(this.section.lastChild);
    const comment_data = await fetchComments(this.story_id, 10, this.n_comments_loaded, 1, 0);
    this.n_comments_loaded += comment_data.length;
    for (const comment of comment_data) {
        const comment_object = new Comment(comment);
        this.comments.push(comment_object);
        this.section.appendChild(comment_object.render());
    }
    this.appendButton();

  }
}