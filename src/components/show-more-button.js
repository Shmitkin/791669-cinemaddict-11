import AbstractComponent from "./abstract-component.js";

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return ShowMoreButton._createTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  static _createTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
