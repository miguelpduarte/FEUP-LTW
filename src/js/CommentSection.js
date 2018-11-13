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
      //Todo add spinner and remove timeout
    if (this.section === null) return;

    const comment_data =
        await fetchComments(this.story_id, 10, this.n_comments_loaded, 1, 0);
    if (comment_data == null || comment_data.length == 0) return;
    this.n_comments_loaded += comment_data.length;
    this.loading = true;
    setTimeout(() => {
      for (const comment of comment_data) {
        const comment_object = new Comment(comment);
        this.comments.push(comment_object);
        this.section.appendChild(comment_object.render());
      }
      this.loading = false;
    }, 1000)
  }
}