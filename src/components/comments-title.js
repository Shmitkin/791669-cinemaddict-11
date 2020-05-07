import AbstractComponent from "./abstract-component.js";

export default class CommentsTitle extends AbstractComponent {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return CommentsTitle._createTemplate(this._comments);
  }

  static _createTemplate(comments) {
    return (
      `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>`
    );
  }
}
