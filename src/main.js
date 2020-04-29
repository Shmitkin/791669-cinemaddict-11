import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films.js";

import {generateFilms} from "./mock/film.js";

import {CardCount} from "./consts.js";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const films = generateFilms(CardCount.SUMMARY);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const pageController = new PageController(filmsModel, siteHeaderElement, siteMainElement, siteFooterElement);

pageController.render();
