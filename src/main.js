import API from "./api.js";
import FilmsController from "./controllers/films.js";
import FilmsModel from "./models/films.js";
import HeaderProfileController from "./controllers/header-profile-controller.js";
import MainNavigationController from "./controllers/main-navigation-controller.js";
import FilmsComponent from "./components/films.js";
import {render} from "./utils/render.js";
import StatComponent from "./components/stat.js";
import {ViewMode} from "./consts.js";
import StatsComponent from "./components/stats.js";
import StatsController from "./controllers/stats.js";

const AUTHORIZATION = `Basic dwef=fdddshiudfn9`;

const onViewModeChange = (viewMode) => {
  switch (viewMode) {
    case ViewMode.DEFAULT:
      filmsComponent.show();
      statsComponent.hide();
      break;
    case ViewMode.STATS:
      filmsComponent.hide();
      statsComponent.show();
      break;
  }
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const api = new API(AUTHORIZATION);
const filmsModel = new FilmsModel();
const filmsComponent = new FilmsComponent();
const statsComponent = new StatsComponent();

const filmsController = new FilmsController(filmsComponent.getElement(), filmsModel, siteFooterElement, api);
const headerProfileController = new HeaderProfileController(siteHeaderElement, filmsModel);
const mainNavigationController = new MainNavigationController(siteMainElement, filmsModel, onViewModeChange);
const userStatsController = new StatsController(statsComponent.getElement(), filmsModel);

mainNavigationController.render();
headerProfileController.render();
userStatsController.render();
render(siteMainElement, filmsComponent);
render(siteMainElement, statsComponent);
statsComponent.hide();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    filmsController.render();
    render(siteFooterElement, new StatComponent(filmsModel.getFilmsAll().length));
  });

