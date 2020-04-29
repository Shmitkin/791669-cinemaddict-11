import {render, remove, RenderPosition} from "../utils/render.js";
import FilmsListComponent from "../components/films-list.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortComponent from "../components/sort.js";
import FilmController from "./film-controller.js";
import {CardCount, FilmCardActionType, SortType} from "../consts.js";
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
    this._sortType = SortType.DEFAULT;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();

    this._onSortChange = this._onSortChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const films = this._filmsModel.getFilms();

    if (films.length === 0) {
      render(this._container, new FilmsListComponent({title: `There are no movies in our database`}));
      return;
    }
    render(this._container, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));
    render(this._container, this._sortComponent, RenderPosition.BEFOREBEGIN);
    this._renderFilms(films.slice(0, CardCount.DEFAULT_SHOW));
    this._renderShowMoreButton(films);
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

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);
    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), this._sortType);

    if (this._showingCardsCount >= sortedFilms.length) {
      return;
    }

    const filmsListElement = this._container.querySelector(`.films-list`);
    render(filmsListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._prevCardsCount = this._showingCardsCount;
      this._showingCardsCount += CardCount.SHOW_MORE;

      this._renderFilms(sortedFilms.slice(this._prevCardsCount, this._showingCardsCount));
      if (this._showingCardsCount >= sortedFilms.length) {
        remove(this._showMoreButtonComponent);
      }
    });
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

  _updateFilms() {
    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), this._sortType);
    this._removeFilms();
    this._renderFilms(sortedFilms.slice(0, CardCount.DEFAULT_SHOW));
    this._renderShowMoreButton();
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((controller) => controller.destroy());
    this._showedFilmsControllers = [];
    this._showingCardsCount = CardCount.DEFAULT_SHOW;
  }

  _onChange(action) {
    switch (action.type) {
      case FilmCardActionType.DATA_CHANGE:
        const isSuccess = this._filmsModel.updateFilm(action.oldData.id, action.newData);

        if (isSuccess) {
          action.filmController.render(action.newData);
        }
        break;

      case FilmCardActionType.VIEW_CHANGE:
        this._showedFilmsControllers.forEach((controller) => controller.removeFilmDetails());
        break;
    }
  }

  _onSortChange(sortType) {
    this._sortType = sortType;
    this._updateFilms();
  }

  _onFilterChange() {
    this._updateFilms();
  }
}
