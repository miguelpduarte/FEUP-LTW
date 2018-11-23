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
        await fetchComments(this.story_id, 10, this.n_comments_loaded, 2, 0);


    this.addComments(comment_data);
  }

  addComments(comment_data) {
    // Remove loading message
    this.section.removeChild(this.section.lastChild);
    let needFullReload = false;
    // Append comments
    if (comment_data == null || comment_data.length == 0) {
      this.loading = false;
      return;
    }

    this.n_comments_loaded += comment_data.length;
    for (const comment of comment_data) {
      if(this.comment_loaded(comment))
          needFullReload = true;

      let comment_object = new Comment(comment);
      this.comments.push(comment_object);
      
      if(!needFullReload)
        this.section.appendChild(comment_object.render());

    }

    if(needFullReload)
      reloadCommentsFromMemory();

    this.loading = false;
  }


  comment_loaded(new_comment) {
    for (const comment of this.comments) {
      if(comment.comment_id ===  new_comment.comment_id) {
        comment.score = new_comment.score;
        return true;
      }
    }
    return false;
  }

}