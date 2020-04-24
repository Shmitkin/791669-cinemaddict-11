import {render, remove} from "../utils/render.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmsComponent from "../components/films.js";
import SortComponent from "../components/sort.js";
import FilmController from "./film-controller.js";
import {SortType, CardCount, ActionType} from "../consts.js";

export default class FilmsController {
  constructor(container, films) {
    this._films = films;
    this._showedFilmsControllers = [];
    this._showedTopRatedFilmsControllers = [];
    this._showedMostCommentedFilmControllers = [];
    this._topRatedFilmsElement = null;
    this._mostCommentedFilmsElement = null;
    this._container = container;
    this._showingCardsCount = CardCount.DEFAULT_SHOW;
    this._prevCardsCount = this._showingCardsCount;
    this._filmsComponent = new FilmsComponent();
    this._filmsElement = this._filmsComponent.getElement();
    this._filmsListElement = this._filmsElement.querySelector(`.films-list`);
    this._filmsListContainerElement = null;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
    this._onChange = this._onChange.bind(this);
  }

  render() {

    if (this._films.length === 0) {
      render(this._filmsElement, new FilmsListComponent({title: `There are no movies in our database`}));
      return;
    }
    render(this._filmsElement, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));

    this._filmsListElement = this._filmsElement.querySelector(`.films-list`);
    this._filmsListContainerElement = this._filmsListElement.querySelector(`.films-list__container`);

    this._renderFilms(this._filmsListContainerElement, this._films.slice(0, CardCount.DEFAULT_SHOW), this._onChange);

    this._renderShowMoreButton(this._films);
    this._renderSortComponent(this._films);
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();

    render(this._container, this._filmsComponent);
  }

  rerenderMainContainer(films) {
    this._films = films;
    this._filmsListContainerElement.innerHTML = ``;
    this._showedFilmsControllers = [];
    remove(this._showMoreButtonComponent);

    if (films.length > CardCount.DEFAULT_SHOW) {
      this._showingCardsCount = CardCount.DEFAULT_SHOW;
      this._renderFilms(this._filmsListContainerElement, films.slice(0, CardCount.DEFAULT_SHOW), this._onChange);
      this._renderShowMoreButton(this._films);
      return;
    }
    this._renderFilms(this._filmsListContainerElement, films, this._onChange);

  }

  _onChange(action) {
    switch (action.type) {
      case ActionType.DATA_CHANGE:
        const index = this._films.findIndex((it) => it === action.oldData);
        if (index === -1) {
          return;
        }
        this._films = [].concat(this._films.slice(0, index), action.newData, this._films.slice(index + 1));
        action.filmController.replace(this._films[index]);
        break;

      case ActionType.VIEW_CHANGE:
        this._showedFilmsControllers.forEach((it) => it._removeFilmDetails());
        this._showedTopRatedFilmsControllers.forEach((it) => it._removeFilmDetails());
        this._showedMostCommentedFilmControllers.forEach((it) => it._removeFilmDetails());
        break;
    }
  }

  _getSortedFilms([...films], sortType) {
    switch (sortType) {
      case SortType.DATE_DOWN:
        return films.sort((a, b) => b.release - a.release);
      case SortType.RATING_DOWN:
        return films.sort((a, b) => b.rating - a.rating);
      case SortType.DEFAULT:
        return films;
      default: throw new Error(`Unknown sort type: ${sortType}`);
    }
  }
  _renderSortComponent() {
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._filmsListContainerElement.innerHTML = ``;
      this._showedFilmsControllers = [];
      remove(this._showMoreButtonComponent);

      const sortedFilms = this._getSortedFilms(this._films, sortType);

      if (sortedFilms.length > CardCount.DEFAULT_SHOW) {
        this._showingCardsCount = CardCount.DEFAULT_SHOW;
        this._renderFilms(this._filmsListContainerElement, sortedFilms.slice(0, CardCount.DEFAULT_SHOW), this._onChange);
        this._renderShowMoreButton(sortedFilms);
        return;
      }
      this._renderFilms(this._filmsListContainerElement, sortedFilms);
    });

    render(this._container, this._sortComponent);
  }
  _renderTopRatedFilms() {
    render(this._filmsElement, new FilmsListComponent({title: `Top rated`, isExtra: true}));

    this._topRatedFilmsElement = this._filmsElement.querySelector(`.films-list--extra .films-list__container`);
    const topRatedFilms = this._films.slice().sort((a, b) =>
      b.rating - a.rating).slice(0, CardCount.TOP_RATED);

    this._renderFilms(this._topRatedFilmsElement, topRatedFilms, this._onChange);
  }
  _renderMostCommentedFilms() {
    render(this._filmsElement, new FilmsListComponent({title: `Most commented`, isExtra: true}));

    this._mostCommentedFilmsElement = this._filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);
    const mostCommentedFilms = this._films.slice().sort((a, b) =>
      b.comments.length - a.comments.length).slice(0, CardCount.MOST_COMMENTED);

    this._renderFilms(this._mostCommentedFilmsElement, mostCommentedFilms, this._onChange);
  }
  _renderShowMoreButton(films) {
    this._showMoreButtonComponent.setClickHandler(() => {
      this._prevCardsCount = this._showingCardsCount;

      this._showingCardsCount += CardCount.SHOW_MORE;

      this._renderFilms(this._filmsListContainerElement, films.slice(this._prevCardsCount, this._showingCardsCount), this._onChange);

      if (this._showingCardsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    render(this._filmsListElement, this._showMoreButtonComponent);
  }
  _renderFilms(container, films, onChange) {
    const renderedFilms = films.map((film)=> {
      const filmController = new FilmController(container, onChange);

      filmController.render(film);

      return filmController;
    });

    switch (container) {
      case this._mostCommentedFilmsElement:
        this._showedMostCommentedFilmControllers = this._showedMostCommentedFilmControllers.concat(renderedFilms);
        break;

      case this._topRatedFilmsElement:
        this._showedTopRatedFilmsControllers = this._showedTopRatedFilmsControllers.concat(renderedFilms);
        break;

      default: this._showedFilmsControllers = this._showedFilmsControllers.concat(renderedFilms);
        break;
    }
  }
}
