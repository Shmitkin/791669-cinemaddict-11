export default class Film {
  constructor(data) {
    this.id = data[`id`];
    this.title = {
      main: data[`film_info`][`title`],
      original: data[`film_info`][`alternative_title`]
    };
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.release = data[`film_info`][`release`][`date`];
    this.rating = data[`film_info`][`total_rating`];
    this.duration = data[`film_info`][`runtime`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.ageLimit = data[`film_info`][`age_rating`];
    this.genres = data[`film_info`][`genre`];
    this.poster = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.comments = data[`comments`];
    this.watchlist = data[`user_details`][`watchlist`];
    this.watched = data[`user_details`][`already_watched`];
    this.favorite = data[`user_details`][`favorite`];
    this.watchingDdate = data[`user_details`][`watching_date`];

  }

  static parseFilm(data) {
    return new Film(data);

  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }
}