import {FilterType} from "../consts.js";

const reduceFilms = (stats, film) => {
  if (film.isAddedToWatchlist) {
    stats.watchlist.push(film);
  }
  if (film.isMarkedAsWatched) {
    stats.history.push(film);
  }
  if (film.isFavorite) {
    stats.favorites.push(film);
  }
  return stats;
};

const getFilteredFilms = (films, filterType) => {
  const filteredFilms = films.reduce(reduceFilms, {
    watchlist: [],
    history: [],
    favorites: []
  });

  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.FAVORITES:
      return filteredFilms.favorites;
    case FilterType.HISTORY:
      return filteredFilms.history;
    case FilterType.WATCHLIST:
      return filteredFilms.watchlist;
    default: return filteredFilms;
  }
};


export {getFilteredFilms};
