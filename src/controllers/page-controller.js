import StatComponent from "../components/stat.js";
import HeaderProfileController from "./header-profile-controller.js";
import MainNavigationController from "./main-navigation-controller.js";
import FilmsListComponent from "../components/films-list.js";
import FilmsController from "./films-controller";
import {render, replace} from "../utils/render.js";
import FilmsComponent from "../components/films.js";
import SortComponent from "../components/sort.js";
import TopRatedController from "./top-rated-controller.js";
import {SortType} from "../consts.js";
import MostCommentedController from "./most-commented-controller.js";

export default class PageController {
  constructor(filmsModel, commentsModel, siteHeaderElement, siteMainElement, siteFooterElement, api) {
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._siteHeaderElement = siteHeaderElement;
    this._siteMainElement = siteMainElement;
    this._siteFooterElement = siteFooterElement;

    this._sortType = SortType.DEFAULT;

    this._statComponent = new StatComponent(this._filmsModel.getFilmsAll().length);
    this._filmsComponent = new FilmsComponent();
    this._headerProfileController = new HeaderProfileController(this._siteHeaderElement, this._filmsModel);
    this._mainNavigationController = new MainNavigationController(this._siteMainElement, this._filmsModel);

    this._sortComponent = null;
    this._filmsController = null;
    this._filmsListComponent = null;

    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.addFilterChangeHandler(this._onFilterChange);

  }

  render() {
    this._headerProfileController.render();
    this._mainNavigationController.render();
    this._renderSortComponent();
    render(this._siteMainElement, this._filmsComponent);

    const films = this._filmsModel.getFilms();
    const filmsElement = this._filmsComponent.getElement();


    if (films.length === 0) {
      this._filmsListComponent = new FilmsListComponent({title: `There are no movies in our database`});
      render(filmsElement, this._filmsListComponent);
      this._renderFooterStatistic();
      return;
    }


    this._filmsListComponent = new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true});
    this._filmsController = new FilmsController(this._filmsListComponent.getElement(), this._siteFooterElement, this._filmsModel, this._commentsModel, this._api);
    render(filmsElement, this._filmsListComponent);
    this._filmsController.render();


    if (this._haveFilmsRating()) {
      const topRatedFilmsComponent = new FilmsListComponent({title: `Top rated`, isExtra: true});
      const topRatedFilmsController = new TopRatedController(topRatedFilmsComponent.getElement(), this._siteFooterElement, this._filmsModel, this._commentsModel);
      render(filmsElement, topRatedFilmsComponent);
      topRatedFilmsController.render();
    }


    if (this._haveFilmsComments()) {
      const mostCommentedFilmsComponent = new FilmsListComponent({title: `Most commented`, isExtra: true});
      const mostCommentedFilmsController = new MostCommentedController(mostCommentedFilmsComponent.getElement(), this._siteFooterElement, this._filmsModel, this._commentsModel);
      render(filmsElement, mostCommentedFilmsComponent);
      mostCommentedFilmsController.render();
    }


    this._renderFooterStatistic();
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
      render(this._siteMainElement, this._sortComponent);
    }
  }

  _renderFooterStatistic() {
    const footerStaticticsElement = this._siteFooterElement.querySelector(`.footer__statistics`);
    render(footerStaticticsElement, this._statComponent);
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
