import AbstractComponent from "./abstract-component.js";
import {encode} from "he";

const COMMENT_EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];


export default class NewComment extends AbstractComponent {
  constructor() {
    super();
    this._userEmoji = null;
    this._onEmojiControlsClick();
  }

  getTemplate() {
    return NewComment._createTemplate();
  }

  getNewCommentData() {
    const userCommentElement = this.getElement().querySelector(`.film-details__comment-input`);
    const userComment = userCommentElement.value;
    return {
      emoji: this._userEmoji,
      text: encode(userComment),
      date: new Date()
    };
  }

  setViewMode(mode) {
    const textArea = this.getElement().querySelector(`.film-details__comment-input`);
    const emojis = this.getElement().querySelectorAll(`.film-details__emoji-item`);
    switch (mode) {
      case `error`:
        textArea.disabled = false;
        textArea.style.border = `3px solid red`;
        for (let i = 0; i < emojis.length; i++) {
          emojis[i].disabled = false;
        }
        break;
      case `disabled`:
        textArea.disabled = true;
        textArea.style.border = ``;
        for (let i = 0; i < emojis.length; i++) {
          emojis[i].disabled = true;
        }
        break;
    }
  }

  _onEmojiControlsClick() {
    const emojiList = this.getElement().querySelector(`.film-details__emoji-list`);
    const userEmojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    emojiList.addEventListener(`change`, (evt) => {
      this._userEmoji = evt.target.value;
      userEmojiContainer.innerHTML = (NewComment._createUserEmoji(this._userEmoji));
    });
  }

  static _createTemplate() {
    return (
      `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label"></div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
        <div class="film-details__emoji-list">
          ${COMMENT_EMOJIS.map(NewComment._createEmojiMarkup).join(``)}
        </div>
      </div>`
    );
  }

  static _createEmojiMarkup(emoji) {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
        <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
      </label>`
    );
  }

  static _createUserEmoji(emoji) {
    return (`<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`);
  }
}

