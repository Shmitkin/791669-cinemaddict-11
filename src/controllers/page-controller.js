import StatComponent from "../components/stat.js";
import HeaderProfileController from "./header-profile-controller.js";
import MainNavigationController from "./main-navigation-controller.js";
import {render} from "../utils/render.js";

export default class PageController {
  constructor(films, siteHeaderElement, siteMainElement, siteFooterElement) {
    this._films = films;
    this._siteHeaderElement = siteHeaderElement;
    this._siteMainElement = siteMainElement;
    this._siteFooterElement = siteFooterElement;
    this._statComponent = new StatComponent(this._films.length);
    this._headerProfileController = new HeaderProfileController(this._siteHeaderElement, this._films);
    this._mainNavigationController = new MainNavigationController(this._siteMainElement, this._siteFooterElement, this._films);
  }

  render() {
    this._headerProfileController.render();
    this._mainNavigationController.render();

    this._renderFooterStatistic();

  }
  _renderHeaderProfile() {
    render(this._siteHeaderElement, this._headerProfileComponent);
  }

  _renderFooterStatistic() {
    const footerStaticticsElement = this._siteFooterElement.querySelector(`.footer__statistics`);
    render(footerStaticticsElement, this._statComponent);
  }
}
