import AbstractComponent from "./abstract-component.js";

export default class StatsContainer extends AbstractComponent {
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return `<section class="statistic"></section>`;
  }
}
