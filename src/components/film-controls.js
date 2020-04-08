export const createFilmControlsTemplate = (film) => {

  const {isAddedToWatchlist, isMarkedAsWatched, isFavorite} = film;
  const activeInput = `checked`;

  return (
    `<section class="film-details__controls">
       <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isAddedToWatchlist ? activeInput : ``}>
       <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
   
       <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isMarkedAsWatched ? activeInput : ``}>
       <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
   
       <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? activeInput : ``}>
       <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
     </section>`
  );
};
