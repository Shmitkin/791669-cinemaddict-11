import StatComponent from "../components/stat.js";
import HeaderProfileController from "./header-profile-controller.js";
import MainNavigationController from "./main-navigation-controller.js";
import FilmsController from "./films-controller";
import {render} from "../utils/render.js";
import FilmsComponent from "../components/films.js";

export default class PageController {
  constructor(filmsModel, siteHeaderElement, siteMainElement, siteFooterElement) {
    this._filmsModel = filmsModel;
    this._siteHeaderElement = siteHeaderElement;
    this._siteMainElement = siteMainElement;
    this._siteFooterElement = siteFooterElement;

    this._statComponent = new StatComponent(this._filmsModel.getFilmsAll().length);
    this._filmsComponent = new FilmsComponent();
    this._headerProfileController = new HeaderProfileController(this._siteHeaderElement, this._filmsModel);
    this._mainNavigationController = new MainNavigationController(this._siteMainElement, this._filmsModel);
    this._filmsController = new FilmsController(this._filmsComponent.getElement(), this._siteFooterElement, this._filmsModel);
  }

  render() {
    this._headerProfileController.render();
    this._mainNavigationController.render();

    render(this._siteMainElement, this._filmsComponent);

    this._filmsController.render();
    this._renderFooterStatistic();

  }

  _renderFooterStatistic() {
    const footerStaticticsElement = this._siteFooterElement.querySelector(`.footer__statistics`);
    render(footerStaticticsElement, this._statComponent);
  }
}
