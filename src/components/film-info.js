import {createGenresTemplate} from "./genre.js";

export const createFilmInfoTemplate = (film) => {
  const {
    poster,
    ageLimit,
    title,
    rating,
    director,
    writers,
    cast,
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
         <p class="film-details__age">${ageLimit}</p>
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
             <td class="film-details__cell">${writers}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">Actors</td>
             <td class="film-details__cell">${cast}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">Release Date</td>
             <td class="film-details__cell">${release}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">Runtime</td>
             <td class="film-details__cell">${duration}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">Country</td>
             <td class="film-details__cell">${country}</td>
           </tr>
           <tr class="film-details__row">
             <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
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
