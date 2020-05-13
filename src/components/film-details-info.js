import AbstractComponent from "./abstract-component.js";
import {formatDuration, addProperty} from "../utils/common.js";
import {CardButtonType} from "../consts.js";
import moment from "moment";

const Title = {
  GENRE: `Genre`,
  GENRES: `Genres`
};

const ACTIVE_INPUT = `checked`;

export default class FilmDetailsInfo extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return FilmDetailsInfo._createFilmDetailsTemplate(this._film);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._closeButtonHandler = handler;
  }

  setFilmDetailsControlsClickHandler(handler) {
    this.getElement().querySelector(`.film-details__controls`)
    .addEventListener(`change`, (evt) => {
      evt.preventDefault();

      const controlId = evt.target.id;
      handler(controlId);
    });
  }

  static _createGenreTemplate(genre) {
    return `<span class="film-details__genre">${genre}</span>`;
  }

  static _createGenresTemplate(genres) {
    return genres.map(FilmDetailsInfo._createGenreTemplate).join(``);
  }

  static _getGenreTitle(genres) {
    return genres.length > 1 ? Title.GENRES : Title.GENRE;
  }

  static _formatReleaseDate(date) {
    return moment(date).format(`DD MMMM YYYY`);
  }

  static _createFilmDetailsRowTemplate([term, cell]) {
    return (
      `<tr class="film-details__row">
        <td class="film-details__term">${term}</td>
        <td class="film-details__cell">${cell}</td>
      </tr>`
    );
  }

  static _createFilmDetailsControlsTemplate([type, label, isActive]) {
    return (
      `<input type="checkbox" class="film-details__control-input visually-hidden" id="${type}" name="${type}" ${addProperty(isActive, ACTIVE_INPUT)}>
      <label for="${type}" class="film-details__control-label film-details__control-label--${type}">${label}</label>`
    );
  }

  static _createFilmDetailsTemplate(film) {
    const {poster, ageLimit, title, rating, director, writers, actors, release, duration, country, description, genres, watchlist, watched, favorite} = film;

    const filmDetailsRows = [
      [`Director`, director],
      [`Writers`, writers.join(`, `)],
      [`Actors`, actors.join(`, `)],
      [`Release Date`, FilmDetailsInfo._formatReleaseDate(release)],
      [`Runtime`, formatDuration(duration, `film-stat`)],
      [`Country`, country],
      [FilmDetailsInfo._getGenreTitle(genres), FilmDetailsInfo._createGenresTemplate(genres)]
    ];

    const filmDetailsControls = [
      [CardButtonType.WATCHLIST, `Add to watchlist`, watchlist],
      [CardButtonType.WATCHED, `Already watched`, watched],
      [CardButtonType.FAVORITE, `Add to favorites`, favorite],
    ];

    return (
      `<form class="film-details__inner" action="" method="get">
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
                ${filmDetailsRows.map(FilmDetailsInfo._createFilmDetailsRowTemplate).join(``)}
              </table>
              <p class="film-details__film-description">${description}</p>
            </div>
          </div>
          <section class="film-details__controls">
            ${filmDetailsControls.map(FilmDetailsInfo._createFilmDetailsControlsTemplate).join(``)}
          </section>
        </div>
      </form>`
    );
  }
}
