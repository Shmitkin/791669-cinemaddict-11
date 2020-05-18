import AbstractComponent from "./abstract-component.js";
import {getRatingTitle} from "../utils/common.js";

export default class StatsUserRank extends AbstractComponent {
  constructor(profileRating) {
    super();
    this._profileRating = profileRating;
  }

  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<p class="statistic__rank">Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${getRatingTitle(this._profileRating)}</span>
      </p>`
    );
  }
}
