const GENRE_MAIN = 0;
const MAX_DESCRIPTION_LENGTH = 140;

export const createFilmCardTemplate = (film) => {

  const {
    title,
    rating,
    year,
    duration,
    genres,
    poster,
    description,
    comments,
    isAddedToWatchlist,
    isMarkedAsWatched,
    isFavorite,
  } = film;

  const buttonActiveClass = `film-card__controls-item--active`;
  const cuttedDescription = description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH - 1)}...` : description;

  return (
    `<article class="film-card">
       <h3 class="film-card__title">${title.main}</h3>
       <p class="film-card__rating">${rating}</p>
       <p class="film-card__info">
         <span class="film-card__year">${year}</span>
         <span class="film-card__duration">${duration}</span>
         <span class="film-card__genre">${genres[GENRE_MAIN]}</span>
       </p>
       <img src="${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">${cuttedDescription}</p>
       <a class="film-card__comments">${comments.length} comments</a>
       <form class="film-card__controls">
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddedToWatchlist ? buttonActiveClass : ``}">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isMarkedAsWatched ? buttonActiveClass : ``}">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? buttonActiveClass : ``}">Mark as favorite</button>
       </form>
     </article>`
  );
};
