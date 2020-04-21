import StatComponent from "./components/stat.js";
import HeaderProfileComponent from "./components/header-profile.js";
import MainNavigationComponent from "./components/main-navigation.js";

import FilmsController from "./controllers/films.js";

import {generateFilms} from "./mock/film.js";
import {render} from "./utils/render.js";

const CardCount = {
  SUMMARY: 15,
  DEFAULT_SHOW: 5,
  SHOW_MORE: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

const films = generateFilms(CardCount.SUMMARY);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStaticticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const filmsController = new FilmsController(siteMainElement, CardCount);
const watchStats = filmsController.getWatchStats(films);

render(siteHeaderElement, new HeaderProfileComponent(watchStats.history));
render(siteMainElement, new MainNavigationComponent(watchStats));

filmsController.render(films);

render(footerStaticticsElement, new StatComponent(films.length));


