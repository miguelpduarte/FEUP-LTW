import {Comment} from './Comment.js';
import {fetchComments} from './fetch_actions.js';

export class CommentSection {
  constructor(comments_data, story_id) {
    this.story_id = story_id;
    this.n_comments_loaded = comments_data.length;
    this.comments = comments_data.map(function(comment) {
      return new Comment(comment);
    });
    this.section = null;
    this.loading = false;
  }

  render() {
    this.section = document.createElement('section');
    this.section.classList.add('comment-section');
    this.section.innerHTML = `<h3>Comments</h3>`;
    for (const comment of this.comments) {
      this.section.appendChild(comment.render());
    }

    document.addEventListener('scroll', this.scrollListener.bind(this));
    return this.section;
  }

  scrollListener(event) {
    if (this.section === null) return;

    if (document.body.scrollHeight <=
            document.documentElement.scrollTop + window.innerHeight &&
        !this.loading) {
      this.loadMoreComments()
    }
  }

  async loadMoreComments(event) {
    if (this.section === null || this.loading) return;

    this.loading = true;

    // Append loading message
    let loadingWheel = document.createElement('p');
    loadingWheel.innerHTML = 'Loading comments...';
    this.section.appendChild(loadingWheel);

    // Retrive new comments
    const comment_data =
        await fetchComments(this.story_id, 10, this.n_comments_loaded, 1, 0);

    // TODO: Remove Timeout
    let load = this.addComments.bind(this, comment_data);
    window.setTimeout(load, 2000);
  }

  addComments(comment_data) {
    // Remove loading message
    this.section.removeChild(this.section.lastChild);

    // Append comments
    if (comment_data == null || comment_data.length == 0) {
      this.loading = false;
      return;
    }

    this.n_comments_loaded += comment_data.length;
    for (const comment of comment_data) {
      let comment_object = new Comment(comment);
      this.comments.push(comment_object);
      this.section.appendChild(comment_object.render());
    }
    this.loading = false;
  }
}