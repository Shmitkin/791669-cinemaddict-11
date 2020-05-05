import {FilterType} from "../consts.js";

const reduceFilms = (stats, film) => {
  if (film.watchlist) {
    stats.watchlist.push(film);
  }
  if (film.watched) {
    stats.history.push(film);
  }
  if (film.favorite) {
    stats.favorites.push(film);
  }
  return stats;
};

export const getFilteredFilms = (films, filterType) => {
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

