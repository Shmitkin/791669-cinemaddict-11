import PageController from "./controllers/page-controller.js";

import {generateFilms} from "./mock/film.js";

import {CardCount} from "./consts.js";

const films = generateFilms(CardCount.SUMMARY);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const pageController = new PageController(films, siteHeaderElement, siteMainElement, siteFooterElement);

pageController.render();
