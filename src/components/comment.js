import {castTimeFormat, createElement} from "../utils.js";

const formatCommentDate = (date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;

const createCommentTemplate = (comment) => {
  const {emoji, text, author, date} = comment;
  return (
    `<li class="film-details__comment">
       <span class="film-details__comment-emoji">
         <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
       </span>
       <div>
         <p class="film-details__comment-text">${text}</p>
         <p class="film-details__comment-info">
           <span class="film-details__comment-author">${author}</span>
           <span class="film-details__comment-day">${formatCommentDate(date)}</span>
           <button class="film-details__comment-delete">Delete</button>
         </p>
       </div>
    </li>`
  );
};

export default class Comment {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
  }
  getTemplate() {
    return createCommentTemplate(this._comment);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

