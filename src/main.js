import FilmCardComponent from "./components/film-card.js";
import FilmsComponent from "./components/films.js";
import StatComponent from "./components/stat.js";
import HeaderProfileComponent from "./components/header-profile.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import MainNavigationComponent from "./components/main-navigation.js";
import SortComponent from "./components/sort.js";
import FilmsListComponent from "./components/films-list.js";

import FilmDetailsController from "./controllers/film-details.js";

import {generateFilms} from "./mock/film.js";
import {render, remove, RenderPosition, removeElement} from "./utils/render.js";

const CardCount = {
  SUMMARY: 15,
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

const getMostCommentedFilms = (films) => {
  return films.slice().sort((a, b) => {
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  })
  .slice(0, CardCount.MOST_COMMENTED);
};

const getTopRatedFilms = (films) => {
  return films.slice().sort((a, b) => {
    if (a.rating > b.rating) {
      return -1;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  })
.slice(0, CardCount.TOP_RATED);
};


const getFilmCardComponent = (film) => {
  const filmDetailsController = new FilmDetailsController(film);

  const showFilmDetails = () => {
    const anotherFilmDetailsElement = document.querySelector(`.film-details`);
    if (anotherFilmDetailsElement !== null) {
      removeElement(anotherFilmDetailsElement);

      filmDetailsController.render(siteFooterElement, RenderPosition.AFTEREND);
    } else {
      filmDetailsController.render(siteFooterElement, RenderPosition.AFTEREND);
    }
  };

  const filmCardComponent = new FilmCardComponent(film);

  filmCardComponent.setOnTitleClickHandler(showFilmDetails);
  filmCardComponent.setOnPosterClickHandler(showFilmDetails);
  filmCardComponent.setOnCommentsClickHandler(showFilmDetails);

  return filmCardComponent;
};

const renderFilms = (filmsElement, films) => {

  if (films.length === 0) {
    render(filmsElement, new FilmsListComponent({title: `There are no movies in our database`}));
    return;
  }

  let showingCardsCount = CardCount.DEFAULT_SHOW;

  render(filmsElement, new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true}));

  const filmsListElement = filmsElement.querySelector(`.films-list`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  films
    .slice(0, showingCardsCount)
    .forEach((film)=> {
      render(filmsListContainerElement, getFilmCardComponent(film));
    });

  const showMoreButtonComponent = new ShowMoreButtonComponent();

  showMoreButtonComponent.setClickHandler(() => {
    const prevCardsCount = showingCardsCount;

    showingCardsCount = showingCardsCount + CardCount.SHOW_MORE;

    films.slice(prevCardsCount, showingCardsCount)
      .forEach((film) => render(filmsListContainerElement, getFilmCardComponent(film)));

    if (showingCardsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });

  render(filmsListElement, showMoreButtonComponent);

  // Создаем списки Top Rated и Most Commented
  const mostCommentedFilms = getMostCommentedFilms(films);
  const topRatedFilms = getTopRatedFilms(films);

  render(filmsElement, new FilmsListComponent({title: `Top rated`, isExtra: true}));
  render(filmsElement, new FilmsListComponent({title: `Most commented`, isExtra: true}));

  const topRatedListElement = filmsElement.querySelector(`.films-list--extra .films-list__container`);
  const mostCommentedListElement = filmsElement.querySelector(`.films-list--extra:last-child .films-list__container`);

  topRatedFilms.forEach((film) => render(topRatedListElement, getFilmCardComponent(film)));
  mostCommentedFilms.forEach((film) => render(mostCommentedListElement, getFilmCardComponent(film)));
};

const films = generateFilms(CardCount.SUMMARY);
const watchStats = getWatchStats(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStaticticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new HeaderProfileComponent(watchStats.history));
render(siteMainElement, new MainNavigationComponent(watchStats));
render(siteMainElement, new SortComponent());

const filmsComponent = new FilmsComponent();

render(siteMainElement, filmsComponent);

renderFilms(filmsComponent.getElement(), films);

render(footerStaticticsElement, new StatComponent(films.length));


