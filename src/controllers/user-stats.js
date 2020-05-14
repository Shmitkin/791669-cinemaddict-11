import {render, replace} from "../utils/render.js";
import {formatDuration} from "../utils/common.js";
import UserStatsFilterComponent from "../components/user-stats-filter.js";
import UserStatsChartComponent from "../components/user-stats-chart.js";
import UserStatsInfoComponent from "../components/user-stats-info.js";
import {StatisticsFilterType} from "../consts.js";

import moment from "moment";

const Chart = require(`chart.js`);
const ChartDataLabels = require(`chartjs-plugin-datalabels`);

export default class UserStatsController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._userStatsComponent = null;
    this._chart = null;
    this._userStats = null;
    this._userFilms = null;
    this._userStatsFilterComponent = null;

    this._activeFilterType = StatisticsFilterType.ALL;

    this._updateUserStats = this._updateUserStats.bind(this);
    this._onStatsFilterChange = this._onStatsFilterChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.addDataChangeHandler(this._updateUserStats);
    this._filmsModel.addFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._userFilms = this._filmsModel.getFilmsAll();
    this._userStats = UserStatsController._getUserStats(this._userFilms);

    this._userStatsFilterComponent = new UserStatsFilterComponent();
    this._userStatsFilterComponent.setFilterChangeHandler(this._onStatsFilterChange);

    this._userStatsComponent = new UserStatsInfoComponent(this._userStats);

    render(this._container, this._userStatsFilterComponent);
    render(this._container, this._userStatsComponent);
    render(this._container, new UserStatsChartComponent());
  }

  _updateUserStats() {
    this._userFilms = this._filmsModel.getFilmsAll();
    this._userStats = UserStatsController._getUserStats(this._filterUserFilms(this._userFilms));
    const oldUserStatsComponent = this._userStatsComponent;
    this._userStatsComponent = new UserStatsInfoComponent(this._userStats);
    replace(this._userStatsComponent, oldUserStatsComponent);

    const labels = this._userStats.genresCount.map((genre) => genre[0]);
    const data = this._userStats.genresCount.map((genre) => genre[1]);

    if (this._chart === null) {
      this._chart = this._createChart(labels, data);
    } else {
      this._chart.destroy();
      this._chart = this._createChart(labels, data);
    }
  }

  _onStatsFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._updateUserStats();
  }

  _onFilterChange() {
    this._activeFilterType = StatisticsFilterType.ALL;
    const oldUserStatsFilterComponent = this._userStatsFilterComponent;

    this._userStatsFilterComponent = new UserStatsFilterComponent();
    this._userStatsFilterComponent.setFilterChangeHandler(this._onStatsFilterChange);

    replace(this._userStatsFilterComponent, oldUserStatsFilterComponent);
    this._updateUserStats();
  }

  _filterUserFilms(films) {
    const allFilms = films;
    let filteredFilms = [];

    switch (this._activeFilterType) {
      case StatisticsFilterType.ALL:
        filteredFilms = allFilms;
        break;
      case StatisticsFilterType.TODAY:
        filteredFilms = allFilms.reduce((newFilms, film) => {
          return moment(film.watchingDate).diff(moment(), `days`) === 0
            ? newFilms.concat(film)
            : newFilms;
        }, []);
        break;
      case StatisticsFilterType.WEEK:
        filteredFilms = allFilms.reduce((newFilms, film) => {
          return moment(film.watchingDate).diff(moment(), `weeks`) === 0
            ? newFilms.concat(film)
            : newFilms;
        }, []);
        break;
      case StatisticsFilterType.MONTH:
        filteredFilms = allFilms.reduce((newFilms, film) => {
          return moment(film.watchingDate).diff(moment(), `months`) === 0
            ? newFilms.concat(film)
            : newFilms;
        }, []);
        break;
      case StatisticsFilterType.YEAR:
        filteredFilms = allFilms.reduce((newFilms, film) => {
          return moment(film.watchingDate).diff(moment(), `years`) === 0
            ? newFilms.concat(film)
            : newFilms;
        }, []);
        break;
      default: throw new Error(`Unknown USER STATISTIC FilterType`);
    }
    return filteredFilms;
  }

  static _getUserStats(films) {
    const userStats = films.reduce((total, film) => {
      if (film.watched) {
        total.duration += film.duration;
        total.films = total.films.concat(film);
        total.genres = total.genres.concat(film.genres);
      }
      return total;
    }, {
      films: [],
      duration: 0,
      genres: []
    });

    userStats.genresCount = UserStatsController._sortGenres(userStats.genres);
    userStats.duration = formatDuration(userStats.duration, `user-stat`);

    if (userStats.genres.length === 0) {
      userStats.topGenre = ``;
    } else {
      userStats.topGenre = userStats.genresCount[0][0];
    }

    return userStats;
  }

  static _sortGenres(genres) {
    const genresCount = genres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});

    genres = Object.entries(genresCount);
    genres.sort((a, b) => {
      return b[1] - a[1];
    });

    return genres;
  }

  _createChart(labels, data) {
    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * labels.length;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
}
