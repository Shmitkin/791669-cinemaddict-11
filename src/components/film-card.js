import {addProperty, formatDuration} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";
import {CardButtonType} from "../consts.js";
import moment from "moment";

const GENRE_MAIN = 0;
const MAX_DESCRIPTION_LENGTH = 140;
const BUTTON_ACTIVE_CLASS = `film-card__controls-item--active`;

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return FilmCard._createFilmCardTemplate(this._film);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  setCardControlsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `BUTTON`) {
        return;
      }

      const cardButtonType = evt.target.dataset.type;
      handler(cardButtonType);
    });
  }

  static _createFilmCardTemplate(film) {
    const {title, rating, release, duration, genres, poster, description, comments, watchlist, watched, favorite} = film;
    return (
      `<article class="film-card">
         <h3 class="film-card__title">${title.main}</h3>
         <p class="film-card__rating">${rating}</p>
         <p class="film-card__info">
           <span class="film-card__year">${FilmCard._getReleaseYear(release)}</span>
           <span class="film-card__duration">${formatDuration(duration, `film-stat`)}</span>
           <span class="film-card__genre">${genres[GENRE_MAIN]}</span>
         </p>
         <img src="${poster}" alt="" class="film-card__poster">
         <p class="film-card__description">${FilmCard._truncateDescription(description)}</p>
         <a class="film-card__comments">${comments.length} comments</a>
         <form class="film-card__controls">
           <button data-type="${CardButtonType.WATCHLIST}" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addProperty(watchlist, BUTTON_ACTIVE_CLASS)}">Add to watchlist</button>
           <button data-type="${CardButtonType.WATCHED}" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${addProperty(watched, BUTTON_ACTIVE_CLASS)}">Mark as watched</button>
           <button data-type="${CardButtonType.FAVORITE}" class="film-card__controls-item button film-card__controls-item--favorite ${addProperty(favorite, BUTTON_ACTIVE_CLASS)}">Mark as favorite</button>
         </form>
       </article>`
    );
  }

  static _truncateDescription(description) {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)}...`;
    }
    return description;
  }

  static _getReleaseYear(date) {
    return moment(date).format(`YYYY`);
  }
}
