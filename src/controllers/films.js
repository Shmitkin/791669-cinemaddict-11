import {render, remove} from "../utils/render.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmsComponent from "../components/films.js";
import FilmCardController from "./film-card.js";

export default class FilmsController {
  constructor(container, films, {DEFAULT_SHOW, SHOW_MORE, TOP_RATED, MOST_COMMENTED}) {
    this._container = container;
    this._films = films;
    this._defaultShowCount = DEFAULT_SHOW;
    this._showMoreCount = SHOW_MORE;
    this._topRatedCount = TOP_RATED;
    this._mostCommentedCount = MOST_COMMENTED;
    this._filmsComponent = new FilmsComponent();
    this._filmsElement = this._filmsComponent.getElement();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  getMostCommentedFilms() {
    return this._films.slice().sort((a, b) => {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    })
    .slice(0, this._mostCommentedCount);
  }

  getTopRatedFilms() {
    return this._films.slice().sort((a, b) => {
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      }
      return 0;
    })
  .slice(0, this._topRatedCount);
  }

  getWatchStats() {
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
    return this._films.reduce(reduceFilms, {
      watchlist: 0,
      history: 0,
      favorites: 0
    });
  }

  render() {
    if (this._films.length === 0) {
      render(this._filmsElement, new FilmsListComponent({title: `There are no movies in our database`}));
      return;
    }
    render(this._filmsElement, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));

    const filmsListElement = this._filmsElement.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    let showingCardsCount = this._defaultShowCount;

    this._films.slice(0, showingCardsCount).forEach((film)=> {
      new FilmCardController(film).render(filmsListContainerElement);
    });

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevCardsCount = showingCardsCount;

      showingCardsCount = showingCardsCount + this._showMoreCount;

      this._films.slice(prevCardsCount, showingCardsCount).forEach((film) =>
        new FilmCardController(film).render(filmsListContainerElement));

      if (showingCardsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    render(filmsListElement, this._showMoreButtonComponent);

    const mostCommentedFilms = this.getMostCommentedFilms();
    const topRatedFilms = this.getTopRatedFilms();

    render(this._filmsElement, new FilmsListComponent({title: `Top rated`, isExtra: true}));
    render(this._filmsElement, new FilmsListComponent({title: `Most commented`, isExtra: true}));

    const topRatedFilmsElement = this._filmsElement.querySelector(`.films-list--extra .films-list__container`);
    const mostCommentedFilmsElement = this._filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

    topRatedFilms.forEach((film) => new FilmCardController(film).render(topRatedFilmsElement));
    mostCommentedFilms.forEach((film) => new FilmCardController(film).render(mostCommentedFilmsElement));

    render(this._container, this._filmsComponent);
  }
}
