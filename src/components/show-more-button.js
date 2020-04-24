import AbstractComponent from "./abstract-component.js";

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return this._createTemplate();
  }
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
  _createTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
