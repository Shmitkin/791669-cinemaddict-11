import FilmsListComponent from "../components/films-list.js";
import FilmsListController from "./films-list";
import {render, replace, RenderPosition} from "../utils/render.js";
import SortComponent from "../components/sort.js";
import TopRatedController from "./films-top-rated.js";
import {SortType} from "../consts.js";
import MostCommentedController from "./films-most-commented.js";

export default class FilmsController {
  constructor(container, filmsModel, siteFooterElement, api) {
    this._filmsModel = filmsModel;
    this._api = api;


    this._container = container;
    this._siteFooterElement = siteFooterElement;

    this._sortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._filmsController = null;
    this._filmsListComponent = null;

    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.addFilterChangeHandler(this._onFilterChange);

  }

  render() {

    this._renderSortComponent();

    const films = this._filmsModel.getFilms();

    if (films.length === 0) {
      this._filmsListComponent = new FilmsListComponent({title: `There are no movies in our database`});
      render(this._container, this._filmsListComponent);
      this._renderFooterStatistic();
      return;
    }


    this._filmsListComponent = new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true});
    this._filmsController = new FilmsListController(this._filmsListComponent.getElement(), this._siteFooterElement, this._filmsModel, this._api);
    render(this._container, this._filmsListComponent);
    this._filmsController.render();


    if (this._haveFilmsRating()) {
      const topRatedFilmsComponent = new FilmsListComponent({title: `Top rated`, isExtra: true});
      const topRatedFilmsController = new TopRatedController(topRatedFilmsComponent.getElement(), this._siteFooterElement, this._filmsModel, this._api);
      render(this._container, topRatedFilmsComponent);
      topRatedFilmsController.render();
    }


    if (this._haveFilmsComments()) {
      const mostCommentedFilmsComponent = new FilmsListComponent({title: `Most commented`, isExtra: true});
      const mostCommentedFilmsController = new MostCommentedController(mostCommentedFilmsComponent.getElement(), this._siteFooterElement, this._filmsModel, this._api);
      render(this._container, mostCommentedFilmsComponent);
      mostCommentedFilmsController.render();
    }
  }

  _haveFilmsComments() {
    const filmsCountWithComments = this._filmsModel.getFilmsAll().reduce((count, film) => film.comments.length > 0 ? count + 1 : count, 0);
    if (filmsCountWithComments > 0) {
      return true;
    }
    return false;
  }

  _haveFilmsRating() {
    const filmsCountWithRating = this._filmsModel.getFilmsAll().reduce((count, film) => film.rating > 0 ? count + 1 : count, 0);
    if (filmsCountWithRating > 0) {
      return true;
    }
    return false;
  }

  _renderSortComponent() {
    const oldSortComponent = this._sortComponent;
    this._sortComponent = new SortComponent();
    this._sortComponent.setSortTypeChangeHandler(this._onSortChange);
    if (oldSortComponent) {
      replace(this._sortComponent, oldSortComponent);
    } else {
      render(this._container, this._sortComponent, RenderPosition.BEFOREBEGIN);
    }
  }

  _onFilterChange() {
    this._onSortChange(SortType.DEFAULT);
    this._renderSortComponent();
  }

  _onSortChange(sortType) {
    this._sortType = sortType;
    this._filmsController.updateFilmsContainer(sortType);
  }
}
