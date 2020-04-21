import {render, remove} from "../utils/render.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmsComponent from "../components/films.js";
import SortComponent, {SortType} from "../components/sort.js";
import FilmController from "./film.js";

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
        stats.watchlist += 1;
      }
      if (film.isMarkedAsWatched) {
        stats.history += 1;
      }
      if (film.isFavorite) {
        stats.favorites += 1;
      }
      return stats;
    };
    return films.reduce(reduceFilms, {
      watchlist: 0,
      history: 0,
      favorites: 0
    });
  }

  _renderShowMoreButton() {
  }

  render(films) {
    this._films = films;

    const renderShowMoreButton = (films) => {
      this._showMoreButtonComponent.setClickHandler(() => {
        this._prevCardsCount = this._showingCardsCount;

        this._showingCardsCount = this._showingCardsCount + this._showMoreCount;

        films.slice(this._prevCardsCount, this._showingCardsCount).forEach((film) =>
          new FilmController(filmsListContainerElement).render(film));

        if (this._showingCardsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });

      render(filmsListElement, this._showMoreButtonComponent);

    };

    const renderSortComponent = () => {
      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        this._showingCardsCount = this._defaultShowCount;
        this._prevCardsCount = this._showingCardsCount;
        filmsListContainerElement.innerHTML = ``;

        const sortedFilms = getSortedFilms(this._films, sortType);


        sortedFilms.slice(0, this._defaultShowCount).forEach((film)=>
          new FilmController(filmsListContainerElement).render(film));

        renderShowMoreButton(sortedFilms);
      });
      render(this._container, this._sortComponent);
    };

    const getSortedFilms = (films, sortType) => {
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

    if (films.length === 0) {
      render(this._filmsElement, new FilmsListComponent({title: `There are no movies in our database`}));
      return;
    }
    render(this._filmsElement, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));

    const filmsListElement = this._filmsElement.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    films.slice(0, this._defaultShowCount).forEach((film)=>
      new FilmController(filmsListContainerElement).render(film));


    renderShowMoreButton(films);

    const mostCommentedFilms = this._getMostCommentedFilms(films);
    const topRatedFilms = this._getTopRatedFilms(films);

    render(this._filmsElement, new FilmsListComponent({title: `Top rated`, isExtra: true}));
    render(this._filmsElement, new FilmsListComponent({title: `Most commented`, isExtra: true}));

    const topRatedFilmsElement = this._filmsElement.querySelector(`.films-list--extra .films-list__container`);
    const mostCommentedFilmsElement = this._filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

    topRatedFilms.forEach((film) => new FilmController(topRatedFilmsElement).render(film));
    mostCommentedFilms.forEach((film) => new FilmController(mostCommentedFilmsElement).render(film));
    renderSortComponent();
    render(this._container, this._filmsComponent);
  }
}
