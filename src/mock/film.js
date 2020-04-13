import {
  FILM_TITLES,
  POSTERS,
  GENRES,
  AGE_LIMITS,
  COUNTRIES,
  DIRECTORS,
  WRITERS,
  ACTORS
} from "./film-data.js";

import {
  getRandomArrayItem,
  getRandomBoolean,
  DUMMY_TEXTS
} from "./utils.js";

import {
  getRandomWriters,
  getRandomCast,
  getRandomRating,
  getRandomReleaseDate,
  getRandomDuration,
  getRandomGenres,
  getRandomDescription,
  getCommentsCount
} from "./film-utils.js";

import {generateComments} from "./comment.js";

const generateFilm = () => {

  const title = getRandomArrayItem(FILM_TITLES);
  const releaseDate = getRandomReleaseDate();

  return {
    title: {
      main: title.main,
      original: title.original
    },
    director: getRandomArrayItem(DIRECTORS),
    writers: getRandomWriters(WRITERS),
    cast: getRandomCast(ACTORS),
    release: `${releaseDate.day} ${releaseDate.month} ${releaseDate.year}`,
    rating: getRandomRating(),
    year: `${releaseDate.year}`,
    duration: getRandomDuration(),
    country: getRandomArrayItem(COUNTRIES),
    ageLimit: getRandomArrayItem(AGE_LIMITS),
    genres: getRandomGenres(GENRES),
    poster: `./images/posters/${getRandomArrayItem(POSTERS)}`,
    description: getRandomDescription(DUMMY_TEXTS),
    comments: generateComments(getCommentsCount()),
    isAddedToWatchlist: getRandomBoolean(),
    isMarkedAsWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean()
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
