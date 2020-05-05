import AbstractComponent from "./abstract-component.js";

export default class CommentsWrapper extends AbstractComponent {

  getTemplate() {
    return CommentsWrapper._createTemplate();
  }

  static _createTemplate() {
    return (
      `<section class="film-details__comments-wrap">
      </section>`
    );
  }
}
