import AbstractComponent from "./abstract-component.js";

export default class StatsUserRank extends AbstractComponent {
  constructor() {
    super();

  }

  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<p class="statistic__rank">Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>`
    );
  }
}
