import {
  addProperty,
  formatDuration,
  createElement
} from "../utils.js";

const GENRE_MAIN = 0;
const MAX_DESCRIPTION_LENGTH = 140;
const BUTTON_ACTIVE_CLASS = `film-card__controls-item--active`;

const makeButtonActive = (watchStat) =>
  addProperty(watchStat, BUTTON_ACTIVE_CLASS);

const truncateDescription = (description, maxLength = MAX_DESCRIPTION_LENGTH) => {
  if (description.length > maxLength) {
    return `${description.slice(0, maxLength - 1)}...`;
  }
  return description;
};

const formatYearDate = (date) =>
  `${date.getFullYear()}`;

const createFilmCardTemplate = (film) => {

  const {
    title,
    rating,
    release,
    duration,
    genres,
    poster,
    description,
    comments,
    isAddedToWatchlist,
    isMarkedAsWatched,
    isFavorite,
  } = film;

  return (
    `<article class="film-card">
       <h3 class="film-card__title">${title.main}</h3>
       <p class="film-card__rating">${rating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${formatYearDate(release)}</span>
         <span class="film-card__duration">${formatDuration(duration)}</span>
         <span class="film-card__genre">${genres[GENRE_MAIN]}</span>
       </p>
       <img src="${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">${truncateDescription(description)}</p>
       <a class="film-card__comments">${comments.length} comments</a>
       <form class="film-card__controls">
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${makeButtonActive(isAddedToWatchlist)}">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${makeButtonActive(isMarkedAsWatched)}">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite ${makeButtonActive(isFavorite)}">Mark as favorite</button>
       </form>
     </article>`
  );
};


export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }
  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
