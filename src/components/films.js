import AbstractComponent from "./abstract-component.js";

export default class Films extends AbstractComponent {
  getTemplate() {
    return Films._createTemplate();
  }

  static _createTemplate() {
    return `<section class="films"></section>`;
  }
}
