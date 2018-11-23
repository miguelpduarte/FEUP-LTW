import {fetchSubComments} from './fetch_actions.js';
import {mdToHTML} from './utils.js';

export class Comment {
  constructor(data) {
    this.comment_id = data.comment_id;
    this.author_id = data.author_id;
    this.author_name = data.author_name;
    this.score = data.score;
    this.content = data.content;
    this.created_at = data.created_at;
    this.n_comments_loaded = 0;
    this.subComments = [];
    if(typeof data.nested_comments !== "undefined") {
      this.n_comments_loaded = data.nested_comments.length;
      this.subComments = data.nested_comments.map(function(comment) {
        return new Comment(comment);
      });
    }
    this.section = null;
    this.loading = false;
  }

  render() {
    this.section = document.createElement('section');
    this.section.classList.add('comment-container');
    this.section.id = `story_${this.comment_id}`;
    this.section.innerHTML += `<section class="comment">
                            <h4>Author: <a href="user.php?id=${this.author_id}">${this.author_name}</a></h4>
                            <div>${this.created_at}</div>
                            <div class="comment-score">Score: ${this.score}</div>
                            <div class="md-content">${mdToHTML(this.content)}</div>
                          </section>`;
    if (this.subComments.length != 0) {
      let subcomment_section = document.createElement('section');
      subcomment_section.classList.add('subcomment-container');

      for (const nComment of this.subComments) {
        subcomment_section.appendChild(nComment.render());
      }

      this.section.appendChild(subcomment_section);
      this.section.innerHTML += `<button class="expand-comments" data-id=${this.comment_id}>Expand Comments</button>`;
      this.section.lastChild.addEventListener(`click`, this.loadMoreComments.bind(this));
    }
    return this.section;
  }

  async loadMoreComments(event) {
    if (this.loading) return;

    this.loading = true;
    this.section.removeChild(this.section.lastChild);

    // Append loading message
    let loadingWheel = document.createElement('p');
    loadingWheel.innerHTML = 'Loading comments...';
    this.section.appendChild(loadingWheel);

    const comment_data =
        await fetchSubComments(this.comment_id, 10, this.n_comments_loaded);

    this.addComments(comment_data);

    if (this.subComments.length != 0) {
      this.section.innerHTML += `<button class="expand-comments" data-id=${this.comment_id}>Expand Comments</button>`;
    }

    this.loading = false;
  }

  addComments(comment_data) {
    this.section.removeChild(this.section.lastChild);

    // Append comments
    if (comment_data == null || comment_data.length == 0) {
      this.loading = false;
      return;
    }

    this.n_comments_loaded += comment_data.length;
    for (const nComment of comment_data) {
      let newComment = new Comment(nComment);
      this.subComments.push(newComment);
      this.section.getElementsByClassName('subcomment-container')[0].appendChild(newComment.render());
    }
  }
}
