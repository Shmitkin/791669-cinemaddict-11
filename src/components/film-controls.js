import {addProperty} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const ACTIVE_INPUT = `checked`;

const makeInputActive = (watchStat) =>
  addProperty(watchStat, ACTIVE_INPUT);

const createFilmControlsTemplate = (film) => {
  const {isAddedToWatchlist, isMarkedAsWatched, isFavorite} = film;

  return (
    `<section class="film-details__controls">
       <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${makeInputActive(isAddedToWatchlist)}>
       <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
   
       <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${makeInputActive(isMarkedAsWatched)}>
       <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
   
       <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${makeInputActive(isFavorite)}>
       <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
     </section>`
  );
};

export default class FilmControls extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }
  getTemplate() {
    return createFilmControlsTemplate(this._film);
  }
}
