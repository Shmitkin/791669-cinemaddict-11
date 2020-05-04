import AbstractComponent from "./abstract-component.js";

const COMMENT_EMOJI = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

export default class NewComment extends AbstractComponent {
  constructor() {
    super();
    this._userEmoji = ``;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return this._createTemplate();
  }

  _recoveryListeners() {
    this._subscribeOnEvents();
  }

  _createTemplate() {
    return (
      `<div class="film-details__new-comment">
         <div for="add-emoji" class="film-details__add-emoji-label">
         </div>
         <label class="film-details__comment-label">
           <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
         </label>
         <div class="film-details__emoji-list">
         ${COMMENT_EMOJI.map(NewComment._createEmojiTemplate).join(``)}
         </div>
      </div>`
    );
  }

  _onEmojiChange() {
    const emojiList = this.getElement().querySelector(`.film-details__emoji-list`);
    const userEmojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);

    emojiList.addEventListener(`change`, (evt) => {
      this._userEmoji = evt.target.value;
      userEmojiContainer.innerHTML = (NewComment._createEmojiPictureTemplate(this._userEmoji));
    });
  }

  _subscribeOnEvents() {
    this._onEmojiChange();
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
