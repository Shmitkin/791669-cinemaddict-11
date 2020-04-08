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

import {generateFilms} from "./mock/film.js";

const CardCount = {
  SUMMARY: 17,
  DEFAULT_SHOW: 5,
  SHOW_MORE: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

const films = generateFilms(CardCount.SUMMARY);
const filmsInWatchlist = films.filter((film) => film.isAddedToWatchlist);
const filmsInHistory = films.filter((film) => film.isMarkedAsWatched);
const filmsInFavorite = films.filter((film) => film.isFavorite);

const FIRST_FILM = films[0];

const topRatedFilms = films.slice()
.sort((a, b) => {
  if (a.rating > b.rating) {
    return -1;
  }
  if (a.rating < b.rating) {
    return 1;
  }
  return 0;
})
.slice(0, CardCount.TOP_RATED);

const nostCommentedFilms = films.slice()
.sort((a, b) => {
  if (a.comments.length > b.comments.length) {
    return -1;
  }
  if (a.comments.length < b.comments.length) {
    return 1;
  }
  return 0;
})
.slice(0, CardCount.MOST_COMMENTED);

const watchStats = {
  watchlist: filmsInWatchlist.length,
  history: filmsInHistory.length,
  favorites: filmsInFavorite.length
};


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStaticticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createHeaderProfileTemplate(watchStats.history));
render(siteMainElement, createMainNavigationTemplate({watchStats}));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate({title: `All movies. Upcoming`, isHidden: true}));

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

let showingFilmCount = CardCount.DEFAULT_SHOW;

films
  .slice(0, showingFilmCount)
  .forEach((film)=> {
    render(filmsListContainerElement, createFilmCardTemplate(film));
  });

render(filmsListElement, createShowMoreButtonTemplate());

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {

  const prevFilmsCount = showingFilmCount;
  showingFilmCount = showingFilmCount + CardCount.SHOW_MORE;

  films.slice(prevFilmsCount, showingFilmCount)
    .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film)));

  if (showingFilmCount >= films.length) {
    showMoreButton.remove();
  }
});

render(filmsElement, createFilmsListTemplate({title: `Top rated`, isExtra: true}));
render(filmsElement, createFilmsListTemplate({title: `Most commented`, isExtra: true}));

const topRatedListElement = filmsElement.querySelector(`.films-list--extra .films-list__container`);
const mostCommentedListElement = filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

for (let i = 0; i < CardCount.TOP_RATED; i++) {
  render(topRatedListElement, createFilmCardTemplate(topRatedFilms[i]));
}

for (let i = 0; i < CardCount.MOST_COMMENTED; i++) {
  render(mostCommentedListElement, createFilmCardTemplate(nostCommentedFilms[i]));
}

render(footerStaticticsElement, createStatTemplate(films.length));

const renderFilmDetails = (film) => {

  render(siteFooterElement, createFilmDetailsTemplate(film), `afterend`);

  const filmDetailsElement = document.querySelector(`.film-details`);
  const filmDetailsTopContainerElement = filmDetailsElement.querySelector(`.form-details__top-container`);
  const filmDetailsCommentsElement = filmDetailsElement.querySelector(`.film-details__comments-wrap`);
  const filmDetailsCommentsListElement = filmDetailsCommentsElement.querySelector(`.film-details__comments-list`);

  render(filmDetailsTopContainerElement, createFilmInfoTemplate(film));
  render(filmDetailsTopContainerElement, createFilmControlsTemplate(film));
  render(filmDetailsCommentsElement, createNewCommentTemplate());

  for (let i = 0; i < film.comments.length; i++) {
    render(filmDetailsCommentsListElement, createCommentTemplate(film.comments[i]));
  }
};

renderFilmDetails(FIRST_FILM);

