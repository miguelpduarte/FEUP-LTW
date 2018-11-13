import {mdToHTML} from './utils.js';
import { CommentSection } from './CommentSection.js';

export class Comment{
  constructor(data) {
    this.n_comments_loaded = data.nested_comments.length;
    this.data = data;
    this.section = null;
  }

  render() {
    let section = document.createElement('section');
    section.classList.add('comment-container');
    section.id = `story_${this.data.comment_id}`;
    section.innerHTML += `  <section class="comment">
                                <h4>Author: <a href="user.php?id=${this.data.author_id}">${this.data.author_name}</a></h4>
                                <div class="comment-score">Score: ${this.data.score}</div>
                                <div class="md-content">${mdToHTML(this.data.content)}</div>
                            </section>`;
    for (const nComment of this.data.nested_comments) {
      section.innerHTML += `<section class="subcomment comment">
                                <h4>Author: <a href="user.php?id=${nComment.author_id}">${nComment.author_name}</a></h4>
                                <div class="comment-score">Score: ${nComment.score}</div>
                                <div class="md-content">${mdToHTML(nComment.content)}</div>
                            </section>`;
    }
    if(this.data.nested_comments.length != 0) {
        section.innerHTML += `<button class="expand-comments" data-id=${this.data.comment_id}>Expand Comments</button>`
        section.lastChild.addEventListener(`click`, this.loadMoreComments.bind(this));
    }
    this.section = section;
    return section;
  }

  loadMoreComments(event) {

  }
}