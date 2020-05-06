import AbstractComponent from "./abstract-component.js";

export default class FilmsListContainer extends AbstractComponent {
  getTemplate() {
    return FilmsListContainer._createTemplate();
  }

  static _createTemplate() {
    return `<div class="films-list__container"></div>`;
  }
}
