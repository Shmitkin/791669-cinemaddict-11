import AbstractComponent from "./abstract-component.js";

export default class Stat extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<section class="footer__statistics">
        <p>${this._filmsCount} movies inside</p>
      </section>`
    );
  }
}
