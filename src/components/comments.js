import {castTimeFormat} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const COMMENT_EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const formatCommentDate = (date) =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
    this._userEmoji = null;

    this._onEmojiControlsClick();
  }

  getTemplate() {
    return Comments._createCommentsTemplate(this._comments);
  }

  _onEmojiControlsClick() {
    const emojiList = this.getElement().querySelector(`.film-details__emoji-list`);
    const userEmojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    emojiList.addEventListener(`change`, (evt) => {
      this._userEmoji = evt.target.value;
      userEmojiContainer.innerHTML = (Comments._createEmojiPictureTemplate(this._userEmoji));
    });
  }

  static _createCommentsTemplate(comments) {
    return (
      `<div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list">
          ${comments.map(Comments._createCommentTemplate).join(``)}
          </ul>
          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
            <div class="film-details__emoji-list">
              ${COMMENT_EMOJIS.map(Comments._createEmojiTemplate).join(``)}
            </div>
          </div>
        </section>
      </div>`
    );
  }

  static _createCommentTemplate(comment) {
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
  }

  static _createEmojiTemplate(emoji) {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
        <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
      </label>`
    );
  }

  static _createEmojiPictureTemplate(emoji) {
    return (`<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`);
  }


}

