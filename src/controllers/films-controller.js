import {render, remove, RenderPosition} from "../utils/render.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortComponent from "../components/sort.js";
import FilmController from "./film-controller.js";
import {CardCount, ActionType} from "../consts.js";
import {getSortedFilms, getSortedArrayByKey} from "../utils/common.js";

const getMostCommentedFilms = (films) => {
  return films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, CardCount.MOST_COMMENTED);
};

export default class FilmsController {
  constructor(container, modalContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._container = container;
    this._modalContainer = modalContainer;

    this._showingCardsCount = CardCount.DEFAULT_SHOW;
    this._prevCardsCount = this._showingCardsCount;

    this._showedFilmsControllers = [];

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onChange = this._onChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();

    if (films.length === 0) {
      render(this._container, new FilmsListComponent({title: `There are no movies in our database`}));
      return;
    }
    render(this._container, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));

    this._renderFilms(films.slice(0, CardCount.DEFAULT_SHOW));

    if (films.length > CardCount.DEFAULT_SHOW) {
      this._renderShowMoreButton(films);
    }

    this._renderSortComponent();
  }

  _onChange(action) {
    switch (action.type) {
      case ActionType.DATA_CHANGE:
        const isSuccess = this._filmsModel.updateFilm(action.oldData.id, action.newData);

        if (isSuccess) {
          action.filmController.update(action.newData);
        }
        break;

      case ActionType.VIEW_CHANGE:
        this._showedFilmsControllers.forEach((controller) => controller._removeFilmDetails());
        break;
    }
  }

  _renderTopRatedFilms(container) {
    render(container, new FilmsListComponent({title: `Top rated`, isExtra: true}));
    const topRatedFilmsElement = container.querySelector(`.films-list--extra .films-list__container`);

    const topRatedFilms = getSortedArrayByKey(this._filmsModel.getFilmsAll(), `rating`).slice(0, CardCount.TOP_RATED);

    this._renderFilms(topRatedFilmsElement, topRatedFilms);
  }

  _renderMostCommentedFilms(container) {
    render(container, new FilmsListComponent({title: `Most commented`, isExtra: true}));
    const mostCommentedFilmsElement = container.querySelector(`.films-list--extra:last-child .films-list__container`);

    const mostCommentedFilms = getMostCommentedFilms(this._filmsModel.getFilmsAll());

    this._renderFilms(mostCommentedFilmsElement, mostCommentedFilms);
  }

  _renderShowMoreButton(films) {
    const filmsListElement = this._container.querySelector(`.films-list`);
    this._showingCardsCount = CardCount.DEFAULT_SHOW;

    this._showMoreButtonComponent.setClickHandler(() => {
      this._prevCardsCount = this._showingCardsCount;
      this._showingCardsCount += CardCount.SHOW_MORE;

      this._renderFilms(films.slice(this._prevCardsCount, this._showingCardsCount));

      if (this._showingCardsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    render(filmsListElement, this._showMoreButtonComponent);
  }

  _renderSortComponent() {
    const filmsListContainerElement = this._container.querySelector(`.films-list__container`);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      filmsListContainerElement.innerHTML = ``;
      this._showedFilmsControllers = [];
      remove(this._showMoreButtonComponent);

      const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType);

      if (sortedFilms.length > CardCount.DEFAULT_SHOW) {
        this._showingCardsCount = CardCount.DEFAULT_SHOW;
        this._renderFilms(sortedFilms.slice(0, CardCount.DEFAULT_SHOW));
        this._renderShowMoreButton(sortedFilms);
        return;
      }
      this._renderFilms(sortedFilms);
    });

    render(this._container, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderFilms(films) {
    const filmsListContainerElement = this._container.querySelector(`.films-list__container`);
    const renderedFilms = films.map((film)=> {
      const filmController = new FilmController(filmsListContainerElement, this._modalContainer, this._onChange);
      filmController.render(film);

      return filmController;
    });
    this._showedFilmsControllers = this._showedFilmsControllers.concat(renderedFilms);
  }

  _onFilterChange() {
    this._updateFilms();
  }

  _updateFilms() {
    // this._removeFilms();
    const filmsListContainerElement = this._container.querySelector(`.films-list__container`);
    filmsListContainerElement.innerHTML = ``;
    const films = this._filmsModel.getFilms();

    this._renderFilms(films.slice(0, CardCount.DEFAULT_SHOW));

    if (films.length > CardCount.DEFAULT_SHOW) {
      this._renderShowMoreButton(films);
    }
  }
}
