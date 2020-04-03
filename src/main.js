import {createFilmCardTemplate} from "./components/film-card.js";
import {createFilmsTemplate} from "./components/films.js";
import {createFooterStatisticsTemplate} from "./components/footer-statistics.js";
import {createHeaderProfileTemplate} from "./components/header-profile.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createMostCommentedFilmsTemplate} from "./components/most-commented-films.js";
import {createSortTemplate} from "./components/sorting.js";
import {createTopRatedFilmsTemplate} from "./components/top-rated-films.js";

const CardsCount = {
  MAIN: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStaticticsElement = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, createHeaderProfileTemplate());
render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < CardsCount.MAIN; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}

render(filmsListElement, createLoadMoreButtonTemplate());
render(filmsElement, createTopRatedFilmsTemplate());
render(filmsElement, createMostCommentedFilmsTemplate());

const topRatedListElement = filmsElement.querySelector(`.films-list--extra .films-list__container`);
const mostCommentedListElement = filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

for (let i = 0; i < CardsCount.TOP_RATED; i++) {
  render(topRatedListElement, createFilmCardTemplate());
}

for (let i = 0; i < CardsCount.MOST_COMMENTED; i++) {
  render(mostCommentedListElement, createFilmCardTemplate());
}

render(footerStaticticsElement, createFooterStatisticsTemplate());
