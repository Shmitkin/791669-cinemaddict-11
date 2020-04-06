import {createFilmCardTemplate} from "./components/film-card.js";
import {createFilmsTemplate} from "./components/films.js";
import {createStatTemplate} from "./components/stat.js";
import {createHeaderProfileTemplate} from "./components/header-profile.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createSortTemplate} from "./components/sort.js";
import {createFilmsListTemplate} from "./components/films-list.js";

import {createFilmDetailsTemplate} from "./components/film-details.js";
import {createFilmInfoTemplate} from "./components/film-info.js";
import {createFilmControlsTemplate} from "./components/film-controls.js";
import {createCommentTemplate} from "./components/comment.js";
import {createNewCommentTemplate} from "./components/new-comment.js";


const CardCount = {
  MAIN: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

const COMMENT_COUNT = 4;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStaticticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createHeaderProfileTemplate());
render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate(``, `All movies. Upcoming`, `visually-hidden`));

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < CardCount.MAIN; i++) {
  render(filmsListContainerElement, createFilmCardTemplate());
}

render(filmsListElement, createShowMoreButtonTemplate());
render(filmsElement, createFilmsListTemplate(`--extra`, `Top rated`));
render(filmsElement, createFilmsListTemplate(`--extra`, `Most commented`));

const topRatedListElement = filmsElement.querySelector(`.films-list--extra .films-list__container`);
const mostCommentedListElement = filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

for (let i = 0; i < CardCount.TOP_RATED; i++) {
  render(topRatedListElement, createFilmCardTemplate());
}

for (let i = 0; i < CardCount.MOST_COMMENTED; i++) {
  render(mostCommentedListElement, createFilmCardTemplate());
}

render(footerStaticticsElement, createStatTemplate());

render(siteFooterElement, createFilmDetailsTemplate(COMMENT_COUNT), `afterend`);

const filmDetailsElement = document.querySelector(`.film-details`);
const filmDetailsTopContainerElement = filmDetailsElement.querySelector(`.form-details__top-container`);
const filmDetailsCommentsElement = filmDetailsElement.querySelector(`.film-details__comments-wrap`);
const filmDetailsCommentsListElement = filmDetailsCommentsElement.querySelector(`.film-details__comments-list`);

render(filmDetailsTopContainerElement, createFilmInfoTemplate());
render(filmDetailsTopContainerElement, createFilmControlsTemplate());
render(filmDetailsCommentsElement, createNewCommentTemplate());


for (let i = 0; i < COMMENT_COUNT; i++) {
  render(filmDetailsCommentsListElement, createCommentTemplate());
}

