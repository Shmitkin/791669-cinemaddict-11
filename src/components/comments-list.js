import AbstractComponent from "./abstract-component.js";
import {castTimeFormat} from "../utils/common.js";

const formatCommentDate = (date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;

export default class CommentsList extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return CommentsList._createTemplate(this._comments);
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

  static _createTemplate(comments) {
    return (
      `<ul class="film-details__comments-list">
      ${comments.map(CommentsList._createCommentTemplate).join(``)}
      </ul>`
    );
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
             <span class="film-details__comment-day">${date}</span>
             <button id="${id}" class="film-details__comment-delete">Delete</button>
           </p>
         </div>
      </li>`
    );
  }
}


