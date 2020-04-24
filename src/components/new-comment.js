import AbstractComponent from "./abstract-component.js";

const COMMENT_EMOJI = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

export default class NewComment extends AbstractComponent {
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<div class="film-details__new-comment">
         <div for="add-emoji" class="film-details__add-emoji-label"></div>
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
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>`
    );
  }
}
