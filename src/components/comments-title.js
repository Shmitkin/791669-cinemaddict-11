import AbstractComponent from "./abstract-component.js";

export default class CommentsTitle extends AbstractComponent {
  constructor(commentsCount) {
    super();
    this._commentsCount = commentsCount;
  }

  getTemplate() {
    return CommentsTitle._createTemplate(this._commentsCount);
  }

  static _createTemplate(commentsCount) {
    return (
      `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>`
    );
  }
}
