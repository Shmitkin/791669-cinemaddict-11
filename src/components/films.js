import AbstractComponent from "./abstract-component.js";

export default class Films extends AbstractComponent {
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return `<section class="films"></section>`;
  }
}
