import MainNavigationComponent from "../components/main-navigation.js";
import FilmsController from "./films-controller";
import {render} from "../utils/render.js";
import {FilterType} from "../consts.js";

export default class MainNavigationController {
  constructor(container, modalContainer, films) {
    this._container = container;
    this._films = films;
    this._filmsToShow = this._films;
    this._filmsController = new FilmsController(this._container, modalContainer, this._films);
  }

  render() {
    const watchStatsFilms = this._getWatchStats();
    const mainNavigationComponent = new MainNavigationComponent(watchStatsFilms);

    mainNavigationComponent.setFilerTypeChangeHandler((filterType) => {
      switch (filterType) {
        case FilterType.ALL:
          this._filmsToShow = this._films;
          this._filmsController.rerenderMainContainer(this._filmsToShow);
          break;
        case FilterType.WATCHLIST:
          this._filmsToShow = watchStatsFilms.watchlist;
          this._filmsController.rerenderMainContainer(this._filmsToShow);
          break;
        case FilterType.HISTORY:
          this._filmsToShow = watchStatsFilms.history;
          this._filmsController.rerenderMainContainer(this._filmsToShow);
          break;
        case FilterType.FAVORITES:
          this._filmsToShow = watchStatsFilms.favorites;
          this._filmsController.rerenderMainContainer(this._filmsToShow);
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

