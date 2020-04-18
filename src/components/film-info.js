import AbstractComponent from "./abstract-component.js";
import {createGenresTemplate} from "./genre.js";
import {formatDuration} from "../utils/common.js";
import {MONTH_NAMES} from "../consts.js";

const Title = {
  GENRE: `Genre`,
  GENRES: `Genres`
};

const getGenreTitle = (genres) =>
  genres.length > 1 ? Title.GENRES : Title.GENRE;

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

const createFilmDetailsTemplate = (filmDetailsRows) => {
  return (
    filmDetailsRows.map(([term, cell]) => (
      createFilmDetailsRowTemplate(term, cell)
    )).join(``));
};

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
         ${createFilmDetailsTemplate(filmDetailsRows)}
         </table>
         <p class="film-details__film-description">${description}</p>
       </div>
     </div>`
  );
};

export default class FilmInfo extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }
  getTemplate() {
    return createFilmInfoTemplate(this._film);
  }
}
