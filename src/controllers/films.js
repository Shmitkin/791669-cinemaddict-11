import {render, remove} from "../utils/render.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmsComponent from "../components/films.js";
import SortComponent, {SortType} from "../components/sort.js";
import FilmController from "./film.js";
import MainNavigationComponent, {FilterType} from "../components/main-navigation.js";

export default class FilmsController {
  constructor(container, {DEFAULT_SHOW, SHOW_MORE, TOP_RATED, MOST_COMMENTED}) {
    this._films = [];
    this._container = container;
    this._defaultShowCount = DEFAULT_SHOW;
    this._showMoreCount = SHOW_MORE;
    this._topRatedCount = TOP_RATED;
    this._mostCommentedCount = MOST_COMMENTED;
    this._showingCardsCount = this._defaultShowCount;
    this._prevCardsCount = this._showingCardsCount;
    this._filmsComponent = new FilmsComponent();
    this._filmsElement = this._filmsComponent.getElement();
    this._filmsListElement = this._filmsElement.querySelector(`.films-list`);
    this._filmsListElement = null;
    this._filmsListContainerElement = null;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
  }

  _getMostCommentedFilms(films) {
    return films
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, this._mostCommentedCount);
  }

  _getTopRatedFilms(films) {
    return films
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, this._topRatedCount);
  }

  getWatchStats(films) {
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
    return films.reduce(reduceFilms, {
      watchlist: [],
      history: [],
      favorites: []
    });
  }

  _getSortedFilms(films, sortType) {
    let sortedFilms = [];
    const showingFilms = films.slice();

    switch (sortType) {
      case SortType.DATE_DOWN:
        sortedFilms = showingFilms.sort((a, b) => b.release.getFullYear() - a.release.getFullYear());
        break;
      case SortType.RATING_DOWN:
        sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedFilms = showingFilms;
        break;
    }
    return sortedFilms.slice();
  }

  _renderShowMoreButton(films) {
    this._showMoreButtonComponent.setClickHandler(() => {
      this._prevCardsCount = this._showingCardsCount;

      this._showingCardsCount = this._showingCardsCount + this._showMoreCount;

      films.slice(this._prevCardsCount, this._showingCardsCount).forEach((film) =>
        new FilmController(this._filmsListContainerElement).render(film));

      if (this._showingCardsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    render(this._filmsListElement, this._showMoreButtonComponent);
  }

  _renderSortComponent() {
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._showingCardsCount = this._defaultShowCount;
      this._prevCardsCount = this._showingCardsCount;
      this._filmsListContainerElement.innerHTML = ``;
      remove(this._showMoreButtonComponent);

      const sortedFilms = this._getSortedFilms(this._films, sortType);

      this._renderFilms(this._filmsListContainerElement, sortedFilms);
    });
    render(this._container, this._sortComponent);
  }

  _renderMainNavigationComponent(films) {
    const watchStatsFilms = this.getWatchStats(films);
    const mainNavigationComponent = new MainNavigationComponent(watchStatsFilms);

    mainNavigationComponent.setFilerTypeChangeHandler((filterType) => {
      this._showingCardsCount = this._defaultShowCount;
      this._prevCardsCount = this._showingCardsCount;
      this._filmsListContainerElement.innerHTML = ``;
      remove(this._showMoreButtonComponent);

      switch (filterType) {
        case FilterType.ALL:
          this._films = films;
          this._renderFilms(this._filmsListContainerElement, films);
          break;
        case FilterType.WATCHLIST:
          this._films = watchStatsFilms.watchlist;
          this._renderFilms(this._filmsListContainerElement, watchStatsFilms.watchlist);
          break;
        case FilterType.HISTORY:
          this._films = watchStatsFilms.history;
          this._renderFilms(this._filmsListContainerElement, watchStatsFilms.history);
          break;
        case FilterType.FAVORITES:
          this._films = watchStatsFilms.favorites;
          this._renderFilms(this._filmsListContainerElement, watchStatsFilms.favorites);
          break;
      }
    });


    render(this._container, mainNavigationComponent);
  }

  _renderFilms(container, films) {
    films.slice(0, this._defaultShowCount).forEach((film)=>
      new FilmController(container).render(film));
    if (films.length > this._defaultShowCount) {
      this._renderShowMoreButton(films);
    }
  }

  render(films) {
    this._films = films;

    if (films.length === 0) {
      render(this._filmsElement, new FilmsListComponent({title: `There are no movies in our database`}));
      return;
    }
    render(this._filmsElement, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));

    this._filmsListElement = this._filmsElement.querySelector(`.films-list`);
    this._filmsListContainerElement = this._filmsListElement.querySelector(`.films-list__container`);

    this._renderFilms(this._filmsListContainerElement, films);

    const mostCommentedFilms = this._getMostCommentedFilms(films);
    const topRatedFilms = this._getTopRatedFilms(films);

    render(this._filmsElement, new FilmsListComponent({title: `Top rated`, isExtra: true}));
    render(this._filmsElement, new FilmsListComponent({title: `Most commented`, isExtra: true}));

    const topRatedFilmsElement = this._filmsElement.querySelector(`.films-list--extra .films-list__container`);
    const mostCommentedFilmsElement = this._filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

    this._renderFilms(topRatedFilmsElement, topRatedFilms);
    this._renderFilms(mostCommentedFilmsElement, mostCommentedFilms);
    this._renderMainNavigationComponent(films);
    this._renderSortComponent(this._films);
    render(this._container, this._filmsComponent);
  }
}
