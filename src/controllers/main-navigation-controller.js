import MainNavigationComponent from "../components/main-navigation.js";
import FilmsController from "./films-controller.js";
import {render} from "../utils/render.js";
import {FilterType} from "../consts.js";

export default class MainNavigationController {
  constructor(container, modalContainer, films) {
    this._container = container;
    this._films = films;
    this._filmsController = new FilmsController(this._container, modalContainer, this._films);
  }

  render() {
    const watchStatsFilms = this._getWatchStats();
    const mainNavigationComponent = new MainNavigationComponent(watchStatsFilms);

    const showFilteredFilms = (films) => {
      this._filmsController.rerenderMainContainer(films);
    };

    mainNavigationComponent.setFilerTypeChangeHandler((filterType) => {
      switch (filterType) {
        case FilterType.ALL:
          showFilteredFilms(this._films);
          break;
        case FilterType.WATCHLIST:
          showFilteredFilms(watchStatsFilms.watchlist);
          break;
        case FilterType.HISTORY:
          showFilteredFilms(watchStatsFilms.history);
          break;
        case FilterType.FAVORITES:
          showFilteredFilms(watchStatsFilms.favorites);
          break;
      }
    });

    render(this._container, mainNavigationComponent);
    this._filmsController.render();
  }

  _getWatchStats() {
    const reduceFilms = (stats, film) => {
      if (film.isAddedToWatchlist) {
        stats.watchlist.push(film);
      }
      if (film.isMarkedAsWatched) {
        stats.history.push(film);
      }
      if (film.isFavorite) {
        stats.favorites.push(film);
      }
      return stats;
    };
    return this._films.reduce(reduceFilms, {
      watchlist: [],
      history: [],
      favorites: []
    });
  }
}

