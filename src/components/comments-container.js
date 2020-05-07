import AbstractComponent from "./abstract-component.js";

export default class CommentsContainer extends AbstractComponent {

  getTemplate() {
    return CommentsContainer._createTemplate();
  }

  static _createTemplate() {
    return (
      `<div class="form-details__bottom-container"></div>`
    );
  }
}
