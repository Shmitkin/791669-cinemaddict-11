import FilmCardComponent from "./components/film-card.js";
import FilmsComponent from "./components/films.js";
import StatComponent from "./components/stat.js";
import HeaderProfileComponent from "./components/header-profile.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import MainNavigationComponent from "./components/main-navigation.js";
import SortComponent from "./components/sort.js";
import FilmsListComponent from "./components/films-list.js";
import FilmDetailsComponent from "./components/film-details.js";
import FilmInfoComponent from "./components/film-info.js";
import FilmControlsComponent from "./components/film-controls.js";
import CommentComponent from "./components/comment.js";
import NewCommentComponent from "./components/new-comment.js";

import {generateFilms} from "./mock/film.js";

import {render} from "./utils.js";

const CardCount = {
  SUMMARY: 27,
  DEFAULT_SHOW: 5,
  SHOW_MORE: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

const getWatchStats = (films) => {
  const reduceFilms = (stats, film) => {
    if (film.isAddedToWatchlist) {
      stats.watchlist += 1;
    }
    if (film.isMarkedAsWatched) {
      stats.history += 1;
    }
    if (film.isFavorite) {
      stats.favorites += 1;
    }
    return stats;
  };
  return films.reduce(reduceFilms, {
    watchlist: 0,
    history: 0,
    favorites: 0
  });
};

const renderFilmCard = (filmListElement, film) => {

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const filmDetailsTopContainerElement = filmDetailsComponent.getElement().querySelector(`.form-details__top-container`);
  const filmDetailsCommentsElement = filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
  const filmDetailsCommentsListElement = filmDetailsCommentsElement.querySelector(`.film-details__comments-list`);

  render(filmDetailsTopContainerElement, new FilmInfoComponent(film).getElement());
  render(filmDetailsTopContainerElement, new FilmControlsComponent(film).getElement());
  render(filmDetailsCommentsElement, new NewCommentComponent().getElement());
  film.comments.forEach((comment) => render(filmDetailsCommentsListElement, new CommentComponent(comment).getElement()));

  const onCloseButtonClick = () => {
    filmListElement.removeChild(filmDetailsComponent.getElement());
  };

  const showFilmDetails = () => {
    filmListElement.appendChild(filmDetailsComponent.getElement());
  };

  const closeButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButton.addEventListener(`click`, () => {
    onCloseButtonClick();
  });

  const filmCardComponent = new FilmCardComponent(film);

  const filmCommentsLink = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  filmCommentsLink.addEventListener(`click`, () => {
    showFilmDetails();
  });

  const filmTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  filmTitle.addEventListener(`click`, () => {
    showFilmDetails();
  });

  const filmPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  filmPoster.addEventListener(`click`, () => {
    showFilmDetails();
  });
  render(filmListElement, filmCardComponent.getElement());
};

const renderFilms = (filmsElement, films) => {

  let showingCardsCount = CardCount.DEFAULT_SHOW;

  const mostCommentedFilms = films.slice().sort((a, b) => {
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  })
  .slice(0, CardCount.MOST_COMMENTED);

  const topRatedFilms = films.slice().sort((a, b) => {
    if (a.rating > b.rating) {
      return -1;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  })
  .slice(0, CardCount.TOP_RATED);

  render(filmsElement, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}).getElement());

  const filmsListElement = filmsElement.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  films
    .slice(0, showingCardsCount)
    .forEach((film)=> {
      renderFilmCard(filmsListContainerElement, film);
    });

  render(filmsListElement, new ShowMoreButtonComponent().getElement());
  const showMoreButtonElement = filmsListElement.querySelector(`.films-list__show-more`);

  showMoreButtonElement.addEventListener(`click`, () => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + CardCount.SHOW_MORE;
    films.slice(prevCardsCount, showingCardsCount)
      .forEach((film) => renderFilmCard(filmsListContainerElement, film));
    if (showingCardsCount >= films.length) {
      showMoreButtonElement.remove();
    }
  });

  render(filmsElement, new FilmsListComponent({title: `Top rated`, isExtra: true}).getElement());
  render(filmsElement, new FilmsListComponent({title: `Most commented`, isExtra: true}).getElement());

  const topRatedListElement = filmsElement.querySelector(`.films-list--extra .films-list__container`);
  const mostCommentedListElement = filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

  topRatedFilms.forEach((film) => renderFilmCard(topRatedListElement, film));
  mostCommentedFilms.forEach((film) => renderFilmCard(mostCommentedListElement, film));
};

const films = generateFilms(CardCount.SUMMARY);
const watchStats = getWatchStats(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStaticticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new HeaderProfileComponent(watchStats.history).getElement());
render(siteMainElement, new MainNavigationComponent(watchStats).getElement());
render(siteMainElement, new SortComponent().getElement());

const filmsElement = new FilmsComponent();
render(siteMainElement, filmsElement.getElement());

renderFilms(filmsElement.getElement(), films);


render(footerStaticticsElement, new StatComponent(films.length).getElement());


