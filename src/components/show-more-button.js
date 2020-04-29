import AbstractComponent from "./abstract-component.js";

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
