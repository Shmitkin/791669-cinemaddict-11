export default class FilmModel {
  constructor(film) {
    this.id = film[`id`];
    this.title = {
      main: film[`film_info`][`title`],
      original: film[`film_info`][`alternative_title`]
    };
    this.director = film[`film_info`][`director`];
    this.writers = film[`film_info`][`writers`];
    this.actors = film[`film_info`][`actors`];
    this.release = film[`film_info`][`release`][`date`];
    this.rating = film[`film_info`][`total_rating`];
    this.duration = film[`film_info`][`runtime`];
    this.country = film[`film_info`][`release`][`release_country`];
    this.ageLimit = film[`film_info`][`age_rating`];
    this.genres = film[`film_info`][`genre`];
    this.poster = film[`film_info`][`poster`];
    this.description = film[`film_info`][`description`];
    this.comments = film[`comments`];
    this.watchlist = film[`user_details`][`watchlist`];
    this.watched = film[`user_details`][`already_watched`];
    this.favorite = film[`user_details`][`favorite`];
    this.watchingDate = film[`user_details`][`watching_date`];
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.title.main,
        "alternative_title": this.title.original,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.ageLimit,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.release,
          "release_country": this.country
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description
      },
      "user_details": {
        "watchlist": this.watchlist,
        "already_watched": this.watched,
        "watching_date": this.watchingDate,
        "favorite": this.favorite
      }
    };
  }

  static parseFilm(film) {
    return new FilmModel(film);
  }

  static parseFilms(films) {
    return films.map(FilmModel.parseFilm);
  }

  static clone(film) {
    return new FilmModel(film.toRAW());
  }
}
