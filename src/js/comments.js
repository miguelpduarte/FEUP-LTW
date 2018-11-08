import { mdToHTML } from "./utils.js";

export class Comments {
    constructor(comments_data) {
        this.data = comments_data;
        console.log(this.data); 
    }

    render() {
        let section = document.createElement("section");
        section.classList.add("comment-section");
        section.id = `story_${this.data.comment_id}`;
        let inner = `<h3>Comments</h3>`;
        for (const comment of this.data) {
            inner += `<section class="comment-container">
                        <section class="comment">
                        <h4>Author: <a href="user.php?id=${comment.author_id}">${comment.author_name}</a></h4>
                        <div class="md-content">${mdToHTML(comment.content)}</div>
                        </section>`;
                for (const nComment of comment.nested_comments) {
                    inner += `<section class="subcomment comment">`;
                    inner += `<h4>Author: <a href="user.php?id=${nComment.author_id}">${nComment.author_name}</a></h4>`;
                    inner += `<div class="md-content">${mdToHTML(nComment.content)}</div>`
                    inner += `</section>`;
                }
            inner += `</section>`;
        }
        
        section.innerHTML = inner;
        return section;
    }
}