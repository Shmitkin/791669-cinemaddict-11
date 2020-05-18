import moment from "moment";

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
  if (moment(film.watchingDate).diff(moment(), `days`) === 0) {
    stats.watchedToday.push(film);
  }
  if (moment(film.watchingDate).diff(moment(), `weeks`) === 0) {
    stats.watchedWeek.push(film);
  }
  if (moment(film.watchingDate).diff(moment(), `months`) === 0) {
    stats.watchedMonth.push(film);
  }
  if (moment(film.watchingDate).diff(moment(), `years`) === 0) {
    stats.watchedYear.push(film);
  }
  return stats;
};

export const filterFilms = (films) => {
  const filteredFilms = films.reduce(reduceFilms, {
    watchlist: [],
    history: [],
    favorites: [],
    watchedToday: [],
    watchedWeek: [],
    watchedMonth: [],
    watchedYear: []
  });
  return filteredFilms;
};

