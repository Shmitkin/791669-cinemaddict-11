import AbstractComponent from "./abstract-component.js";
import moment from "moment";

export default class CommentsList extends AbstractComponent {
  constructor({status, comments}) {
    super();
    this._comments = comments;
    this._status = status;
  }

  getTemplate() {
    return this._createTemplate(this._status);
  }

  setOnCommentClickHandler(handler) {
    const commentsList = this.getElement();
    commentsList.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }
      handler(evt.target.id);
    });

  }

  _createTemplate(status) {
    switch (status) {
      case `loading`:
        return (
          `<ul class="film-details__comments-list">
            <li> LOADING </li>
          </ul>`
        );
      case `loaded`:
        return (
          `<ul class="film-details__comments-list">
            ${this._comments.map(CommentsList._createCommentTemplate).join(``)}
          </ul>`
        );
      default: throw new Error(`UNKNOWN STATUS`);
    }
  }

  static _createCommentTemplate(comment) {
    const {emoji, text, author, date, id} = comment;
    return (
      `<li class="film-details__comment">
         <span class="film-details__comment-emoji">
           <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
         </span>
         <div>
           <p class="film-details__comment-text">${text}</p>
           <p class="film-details__comment-info">
             <span class="film-details__comment-author">${author}</span>
             <span class="film-details__comment-day">${CommentsList._formatCommentDate(date)}</span>
             <button id="${id}" class="film-details__comment-delete">Delete</button>
           </p>
         </div>
      </li>`
    );
  }

  static _formatCommentDate(date) {
    return moment(date).fromNow();
  }
}


