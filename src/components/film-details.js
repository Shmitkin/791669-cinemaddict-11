import AbstractComponent from "./abstract-component.js";
import {formatDuration, addProperty} from "../utils/common.js";
import {MONTH_NAMES} from "../consts.js";

const Title = {
  GENRE: `Genre`,
  GENRES: `Genres`
};

const ACTIVE_INPUT = `checked`;

const makeInputActive = (watchStat) =>
  addProperty(watchStat, ACTIVE_INPUT);

const getGenreTitle = (genres) =>
  genres.length > 1 ? Title.GENRES : Title.GENRE;

const createGenreTemplate = (genre) =>
  `<span class="film-details__genre">${genre}</span>`;

const createGenresTemplate = (genres) => {
  return genres.map(createGenreTemplate).join(``);
};

const formatReleaseDate = (date) =>
  `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

const createFilmDetailsRowTemplate = (term, cell) => {
  return (
    `<tr class="film-details__row">
        <td class="film-details__term">${term}</td>
        <td class="film-details__cell">${cell}</td>
      </tr>`
  );
};

const createFilmDetailRowsTemplate = (filmDetailsRows) => {
  return (
    filmDetailsRows.map(([term, cell]) => (
      createFilmDetailsRowTemplate(term, cell)
    )).join(``));
};

const createFilmDetailsTemplate = (film) => {
  const {poster, ageLimit, title, rating, director,
    writers, actors, release, duration, country,
    description, genres, comments,
    isAddedToWatchlist, isMarkedAsWatched, isFavorite
  } = film;

  const filmDetailsRows = [
    [`Director`, director],
    [`Writers`, writers.join(`, `)],
    [`Actors`, actors.join(`, `)],
    [`Release Date`, formatReleaseDate(release)],
    [`Runtime`, formatDuration(duration)],
    [`Country`, country],
    [getGenreTitle(genres), createGenresTemplate(genres)]
  ];

  return (
    `<section class="film-details">
       <form class="film-details__inner" action="" method="get">
         <div class="form-details__top-container">
           <div class="film-details__close">
             <button class="film-details__close-btn" type="button">close</button>
           </div>
         <div class="film-details__info-wrap">
           <div class="film-details__poster">
             <img class="film-details__poster-img" src="${poster}" alt="">
             <p class="film-details__age">${ageLimit}+</p>
           </div>
           <div class="film-details__info">
             <div class="film-details__info-head">
               <div class="film-details__title-wrap">
                 <h3 class="film-details__title">${title.main}</h3>
                 <p class="film-details__title-original">Original: ${title.original}</p>
               </div>
               <div class="film-details__rating">
                 <p class="film-details__total-rating">${rating}</p>
               </div>
             </div>
             <table class="film-details__table">
             ${createFilmDetailRowsTemplate(filmDetailsRows)}
             </table>
             <p class="film-details__film-description">${description}</p>
           </div>
         </div>
         <section class="film-details__controls">
           <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${makeInputActive(isAddedToWatchlist)}>
           <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
     
           <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${makeInputActive(isMarkedAsWatched)}>
           <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
     
           <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${makeInputActive(isFavorite)}>
           <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
         </section>
       </div>
       <div class="form-details__bottom-container">
         <section class="film-details__comments-wrap">
           <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
           <ul class="film-details__comments-list">
           </ul>
         </section>
       </div>
     </form>
   </section>`
  );
};

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._closeButtonHandler = null;
  }
  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  setOnCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._closeButtonHandler = handler;
  }
  setOnWatchlistCheckBoxClick(handler) {
    this.getElement().querySelector(`#watchlist`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }
  setOnWatchedCheckBoxClick(handler) {
    this.getElement().querySelector(`#watched`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }
  setOnFavoriteCheckBoxClick(handler) {
    this.getElement().querySelector(`#favorite`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }
}
