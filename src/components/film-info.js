import {createGenresTemplate} from "./genre.js";
import {formatDuration, createElement} from "../utils.js";
import {MONTH_NAMES} from "../consts.js";

const Title = {
  GENRE: `Genre`,
  GENRES: `Genres`
};

const getGenreTitle = (genres) =>
  genres.length > 1 ? Title.GENRES : Title.GENRE;

const formatReleaseDate = (date) =>
  `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

const createFilmInfoTemplate = (film) => {
  const {
    poster,
    ageLimit,
    title,
    rating,
    director,
    writers,
    actors,
    release,
    duration,
    country,
    description,
    genres
  } = film;

  return (
    `<div class="film-details__info-wrap">
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
           <tr class="film-details__row">
             <td class="film-details__term">Director</td>
             <td class="film-details__cell">${director}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">Writers</td>
             <td class="film-details__cell">${writers.join(`, `)}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">Actors</td>
             <td class="film-details__cell">${actors.join(`, `)}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">Release Date</td>
             <td class="film-details__cell">${formatReleaseDate(release)}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">Runtime</td>
             <td class="film-details__cell">${formatDuration(duration)}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">Country</td>
             <td class="film-details__cell">${country}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">${getGenreTitle(genres)}</td>
             <td class="film-details__cell">
               ${createGenresTemplate(genres)}
              </td>
           </tr>
         </table>
         <p class="film-details__film-description">${description}</p>
       </div>
     </div>`
  );
};

export default class FilmInfo {
  constructor(film) {
    this._film = film;
    this._element = null;
  }
  getTemplate() {
    return createFilmInfoTemplate(this._film);
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
