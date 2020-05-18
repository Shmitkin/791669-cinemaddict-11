import {render, replace} from "../utils/render.js";
import {formatDuration} from "../utils/common.js";
import StatsFilterComponent from "../components/stats-filter.js";
import StatsChartComponent from "../components/stats-chart.js";
import StatsInfoComponent from "../components/user-stats-info.js";
import {FilterType} from "../consts.js";
import StatsUserRankComponent from "../components/stats-user-rank.js";

const Chart = require(`chart.js`);
const ChartDataLabels = require(`chartjs-plugin-datalabels`);

export default class UserStatsController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._statsInfoComponent = null;
    this._chart = null;
    this._stats = null;
    this._films = null;
    this._statsFilterComponent = null;
    this._statsUserRankComponent = null;

    this._activeFilterType = FilterType.WATCHED;

    this._updateUserStats = this._updateUserStats.bind(this);
    this._onStatsFilterChange = this._onStatsFilterChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.addDataChangeHandler(this._updateUserStats);
    this._filmsModel.addFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._films = this._filmsModel.getFilmsAll();
    this._stats = UserStatsController._getUserStats(this._filmsModel.getData(`user-statistics`));
    this._statsUserRankComponent = new StatsUserRankComponent(this._films);

    this._statsFilterComponent = new StatsFilterComponent();
    this._statsFilterComponent.setFilterChangeHandler(this._onStatsFilterChange);

    this._statsInfoComponent = new StatsInfoComponent(this._stats);

    render(this._container, this._statsUserRankComponent);

    render(this._container, this._statsFilterComponent);
    render(this._container, this._statsInfoComponent);
    render(this._container, new StatsChartComponent());
  }

  _updateUserStats() {
    this._films = this._filmsModel.getFilteredFilms(this._activeFilterType);
    this._stats = UserStatsController._getUserStats(this._films);
    const labels = this._stats.genresCount.map((genre) => genre[0]);
    const data = this._stats.genresCount.map((genre) => genre[1]);


    const oldStatsInfoComponent = this._statsInfoComponent;
    this._statsInfoComponent = new StatsInfoComponent(this._stats);
    replace(this._statsInfoComponent, oldStatsInfoComponent);

    const oldStatsUserRankComponent = this._statsUserRankComponent;
    this._statsUserRankComponent = new StatsUserRankComponent(this._stats);
    replace(this._statsUserRankComponent, oldStatsUserRankComponent);

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
    this._activeFilterType = FilterType.WATCHED;
    const oldStatsFilterComponent = this._statsFilterComponent;

    this._statsFilterComponent = new StatsFilterComponent();
    this._statsFilterComponent.setFilterChangeHandler(this._onStatsFilterChange);

    replace(this._statsFilterComponent, oldStatsFilterComponent);
    this._updateUserStats();
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
          barThickness: 24,
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
