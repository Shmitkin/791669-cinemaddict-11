import {render, remove} from "../utils/render.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import FilmsComponent from "../components/films.js";
import SortComponent from "../components/sort.js";
import FilmController from "./film-controller.js";
import {SortType, CardCount, ActionType} from "../consts.js";

export default class FilmsController {
  constructor(container, modalContainer, films) {
    this._films = films;
    this._container = container;
    this._modalContainer = modalContainer;

    this._showingCardsCount = CardCount.DEFAULT_SHOW;
    this._prevCardsCount = this._showingCardsCount;

    this._showedFilmsControllers = [];
    // this._showedTopRatedFilmsControllers = [];
    // this._showedMostCommentedFilmControllers = [];

    this._filmsComponent = new FilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onChange = this._onChange.bind(this);
  }

  render() {
    const filmsElement = this._filmsComponent.getElement();

    if (this._films.length === 0) {
      render(filmsElement, new FilmsListComponent({title: `There are no movies in our database`}));
      return;
    }
    render(filmsElement, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));

    const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

    this._renderFilms(filmsListContainerElement, this._films.slice(0, CardCount.DEFAULT_SHOW));

    if (this._films.length > CardCount.DEFAULT_SHOW) {
      this._renderShowMoreButton(filmsListContainerElement, this._films);
    }

    this._renderSortComponent(filmsListContainerElement);

    this._renderTopRatedFilms(filmsElement);
    this._renderMostCommentedFilms(filmsElement);

    render(this._container, this._filmsComponent);
  }

  rerenderMainContainer(films) {
    this._films = films;

    const filmsListContainerElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);
    filmsListContainerElement.innerHTML = ``;
    this._showedFilmsControllers = [];

    remove(this._showMoreButtonComponent);

    if (films.length > CardCount.DEFAULT_SHOW) {
      this._showingCardsCount = CardCount.DEFAULT_SHOW;
      this._renderFilms(filmsListContainerElement, this._films.slice(0, CardCount.DEFAULT_SHOW));
      this._renderShowMoreButton(filmsListContainerElement, this._films);
      return;
    }

    this._renderFilms(filmsListContainerElement, this._films);
  }

  _onChange(action) {
    switch (action.type) {
      case ActionType.DATA_CHANGE:
        const index = this._films.findIndex((film) => film === action.oldData);
        if (index === -1) {
          return;
        }
        this._films = [].concat(this._films.slice(0, index), action.newData, this._films.slice(index + 1));
        action.filmController.replace(this._films[index]);
        break;

      case ActionType.VIEW_CHANGE:
        this._showedFilmsControllers.forEach((controller) => controller._removeFilmDetails());
        this._showedTopRatedFilmsControllers.forEach((controller) => controller._removeFilmDetails());
        this._showedMostCommentedFilmControllers.forEach((controller) => controller._removeFilmDetails());
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

  _renderTopRatedFilms(container) {
    render(container, new FilmsListComponent({title: `Top rated`, isExtra: true}));
    const topRatedFilmsElement = container.querySelector(`.films-list--extra .films-list__container`);

    const topRatedFilms = this._films.slice().sort((a, b) =>
      b.rating - a.rating).slice(0, CardCount.TOP_RATED);

    this._renderFilms(topRatedFilmsElement, topRatedFilms);
  }

  _renderMostCommentedFilms(container) {
    render(container, new FilmsListComponent({title: `Most commented`, isExtra: true}));
    const mostCommentedFilmsElement = container.querySelector(`.films-list--extra:last-child .films-list__container`);

    const mostCommentedFilms = this._films.slice().sort((a, b) =>
      b.comments.length - a.comments.length).slice(0, CardCount.MOST_COMMENTED);

    this._renderFilms(mostCommentedFilmsElement, mostCommentedFilms);
  }

  _renderShowMoreButton(filmsListContainer, films) {
    const filmsListElement = this._filmsComponent.getElement().querySelector(`.films-list`);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._prevCardsCount = this._showingCardsCount;
      this._showingCardsCount += CardCount.SHOW_MORE;

      this._renderFilms(filmsListContainer, films.slice(this._prevCardsCount, this._showingCardsCount));

      if (this._showingCardsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    render(filmsListElement, this._showMoreButtonComponent);
  }

  _renderSortComponent(filmsListContainer) {
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      filmsListContainer.innerHTML = ``;
      this._showedFilmsControllers = [];
      remove(this._showMoreButtonComponent);

      const sortedFilms = this._getSortedFilms(this._films, sortType);

      if (sortedFilms.length > CardCount.DEFAULT_SHOW) {
        this._showingCardsCount = CardCount.DEFAULT_SHOW;
        this._renderFilms(filmsListContainer, sortedFilms.slice(0, CardCount.DEFAULT_SHOW));
        this._renderShowMoreButton(filmsListContainer, sortedFilms);
        return;
      }
      this._renderFilms(filmsListContainer, sortedFilms);
    });

    render(this._container, this._sortComponent);
  }

  _renderFilms(container, films) {
    const renderedFilms = films.map((film)=> {
      const filmController = new FilmController(container, this._modalContainer, this._onChange);

      filmController.render(film);

      return filmController;
    });
    this._showedFilmsControllers = this._showedFilmsControllers.concat(renderedFilms);
  }
}
