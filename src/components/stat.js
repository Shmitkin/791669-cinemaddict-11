import {createElement} from "../utils.js";

const createStatTemplate = (filmsCount) =>
  `<p>${filmsCount} movies inside</p>`;


export default class Stat {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }
  getTemplate() {
    return createStatTemplate(this._filmsCount);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
