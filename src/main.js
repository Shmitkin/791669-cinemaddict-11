import API from "./api.js";
import FilmsController from "./controllers/films.js";
import FilmsModel from "./models/films.js";
import HeaderProfileController from "./controllers/header-profile-controller.js";
import MainNavigationController from "./controllers/main-navigation-controller.js";
import FilmsComponent from "./components/films.js";
import {render} from "./utils/render.js";
import StatComponent from "./components/stat.js";

const AUTHORIZATION = `Basic dwef=fdshiudfn9`;


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const api = new API(AUTHORIZATION);
const filmsModel = new FilmsModel();
const filmsComponent = new FilmsComponent();

const filmsController = new FilmsController(filmsComponent.getElement(), filmsModel, siteFooterElement, api);
const headerProfileController = new HeaderProfileController(siteHeaderElement, filmsModel);
const mainNavigationController = new MainNavigationController(siteMainElement, filmsModel);

headerProfileController.render();
mainNavigationController.render();
render(siteMainElement, filmsComponent);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    filmsController.render();
    render(siteFooterElement, new StatComponent(filmsModel.getFilmsAll().length));
  });
