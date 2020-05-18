import AbstractComponent from "./abstract-component.js";

export default class UserStatsInfo extends AbstractComponent {
  constructor(userStats) {
    super();
    this._userStats = userStats;
  }

  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${this._userStats.films.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${this._userStats.duration.hours}<span class="statistic__item-description">h</span> ${this._userStats.duration.minutes}<span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${this._userStats.topGenre}</p>
        </li>
      </ul>`
    );
  }
}
