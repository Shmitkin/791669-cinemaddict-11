import StatComponent from "../components/stat.js";
import HeaderProfileController from "./header-profile-controller.js";
import MainNavigationController from "./main-navigation-controller.js";
import FilmsListComponent from "../components/films-list.js";
import FilmsController from "./films-controller";
import {render, replace} from "../utils/render.js";
import FilmsComponent from "../components/films.js";
import SortComponent from "../components/sort.js";
import {SortType} from "../consts.js";

export default class PageController {
  constructor(filmsModel, siteHeaderElement, siteMainElement, siteFooterElement) {
    this._filmsModel = filmsModel;
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
      render(filmsElement, new FilmsListComponent({title: `There are no movies in our database`}));
      return;
    }
    render(filmsElement, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));

    const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
    this._filmsController = new FilmsController(filmsListContainerElement, this._siteFooterElement, this._filmsModel);
    this._filmsController.render();


    this._renderFooterStatistic();

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
    this._filmsController.updateFilms(sortType);
  }
}
