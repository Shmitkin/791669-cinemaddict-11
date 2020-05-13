import {render, replace} from "../utils/render.js";
import {formatDuration} from "../utils/common.js";
import UserStatsFilterComponent from "../components/user-stats-filter.js";
import UserStatsChartComponent from "../components/user-stats-chart.js";
import UserStatsComponent from "../components/user-stats.js";

export default class UserStatsController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._userStatsComponent = null;
    this._updateUserStats = this._updateUserStats.bind(this);

    this._filmsModel.addDataChangeHandler(this._updateUserStats);
  }

  render() {
    const userStats = UserStatsController._getUserStats(this._filmsModel.getFilmsAll());
    this._userStatsComponent = new UserStatsComponent(userStats);

    render(this._container, new UserStatsFilterComponent());
    render(this._container, this._userStatsComponent);
    render(this._container, new UserStatsChartComponent());
  }

  _updateUserStats() {
    const userStats = UserStatsController._getUserStats(this._filmsModel.getFilmsAll());
    const oldUserStatsComponent = this._userStatsComponent;
    this._userStatsComponent = new UserStatsComponent(userStats);

    replace(this._userStatsComponent, oldUserStatsComponent);
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

    if (userStats.genres.length === 0) {
      userStats.topGenre = ``;
    } else {
      userStats.topGenre = UserStatsController._getTopGenre(userStats.genres);
    }
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
