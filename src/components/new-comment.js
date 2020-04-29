import AbstractSmartComponent from "./abstract-smart-component.js";

const COMMENT_EMOJI = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

export default class NewComment extends AbstractSmartComponent {
  constructor() {
    super();
    this._userEmojiElement = ``;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return this._createTemplate();
  }

  _rerender() {
    super.rerender();
  }

  _createTemplate() {
    return (
      `<div class="film-details__new-comment">
         <div for="add-emoji" class="film-details__add-emoji-label">
         ${this._userEmojiElement}
         </div>
         <label class="film-details__comment-label">
           <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
         </label>
         <div class="film-details__emoji-list">
         ${COMMENT_EMOJI.map(this._createEmojiTemplate).join(``)}
         </div>
      </div>`
    );
  }

  _createEmojiTemplate(emoji) {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
        <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
      </label>`
    );
  }

  _createEmojiPictureTemplate(emoji) {
    return (`<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`);
  }

  _subscribeOnEvents() {
    const emojiListElement = this.getElement().querySelector(`.film-details__emoji-list`);

    emojiListElement.addEventListener(`change`, (evt) => {
      this._userEmojiElement = this._createEmojiPictureTemplate(evt.target.value);
      this._rerender();
    });
  }

  _recoveryListeners() {
    this._subscribeOnEvents();
  }
}
