import AbstractComponent from "./abstract-component.js";

const createStatTemplate = (filmsCount) =>
  `<p>${filmsCount} movies inside</p>`;


export default class Stat extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }
  getTemplate() {
    return createStatTemplate(this._filmsCount);
  }
}
