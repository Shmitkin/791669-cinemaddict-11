import AbstractComponent from "./abstract-component.js";
import {formatDuration} from "../utils/common.js";

export default class UserStats extends AbstractComponent {
  constructor(films) {
    super();
    this._userStats = UserStats._getUserStats(films);
  }

  getTemplate() {
    return this._createTemplate(this._userStats);
  }

  _createTemplate(userStats) {
    return (
      `<section class="statistic">
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
  
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>
  
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>
  
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>
  
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>
  
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>
  
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${userStats.films} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${userStats.duration.hours}<span class="statistic__item-description">h</span> ${userStats.duration.minutes}<span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${userStats.topGenre}</p>
        </li>
      </ul>
  
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
  
    </section>`

    );
  }

  static _getUserStats(films) {
    const userStats = films.reduce((total, film) => {
      if (film.watched) {
        total.duration += film.duration;
        total.films += 1;
        total.genres = total.genres.concat(film.genres);
      }
      return total;
    }, {
      films: 0,
      duration: 0,
      genres: []
    });

    userStats.topGenre = UserStats._getTopGenre(userStats.genres);
    userStats.duration = formatDuration(userStats.duration, `user-stat`);

    return userStats;
  }

  static _getTopGenre(genres) {
    const genresCount = genres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});

    genres = Object.entries(genresCount);
    genres.sort((a, b) => {
      return b[1] - a[1];
    });

    return genres[0][0];
  }
}
