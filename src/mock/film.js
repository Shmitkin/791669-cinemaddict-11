import {
  FILM_TITLES,
  POSTERS,
  GENRES,
  COUNTRIES,
  DIRECTORS,
  WRITERS,
  ACTORS
} from "./film-data.js";

import {
  getRandomArray,
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomBoolean,
  DUMMY_TEXTS,
  getRandomDate
} from "./utils.js";

import {generateComments} from "./comment.js";

const Film = {
  RELEASE_YEAR_MIN: 1945,
  RELEASE_YEAR_MAX: 2020,
  COMMENTS_MIN: 0,
  COMMENTS_MAX: 5,
  DESCRIPTION_SENTENCES_MIN: 1,
  DESCRIPTION_SENTENCES_MAX: 5,
  GENRES_MIN: 1,
  GENRES_MAX: 4,
  ACTORS_MIN: 2,
  ACTORS_MAX: 5,
  DURATION_MIN: 30,
  DURATION_MAX: 180,
  RATING_MIN: 1,
  RATING_MAX: 10,
  WRITERS_MIN: 1,
  WRITERS_MAX: 3,
  AGE_MIN: 0,
  AGE_MAX: 18
};

const getRandomDescription = (description) =>
  getRandomArray(description, Film.DESCRIPTION_SENTENCES_MIN, Film.DESCRIPTION_SENTENCES_MAX).join(` `);

const getCommentsCount = () =>
  getRandomIntegerNumber(Film.COMMENTS_MIN, Film.COMMENTS_MAX);

const getRandomRating = () => {
  const randomNumber = (Film.RATING_MIN + Math.random() * (Film.RATING_MAX - Film.RATING_MIN)) * 10;
  const rating = Math.round(randomNumber) / 10;
  return rating;
};

const generateFilm = () => {

  const title = getRandomArrayItem(FILM_TITLES);

  return {
    id: String(new Date() + Math.random()),
    title: {
      main: title.main,
      original: title.original
    },
    director: getRandomArrayItem(DIRECTORS),
    writers: getRandomArray(WRITERS, Film.WRITERS_MIN, Film.WRITERS_MAX),
    actors: getRandomArray(ACTORS, Film.ACTORS_MIN, Film.ACTORS_MAX),
    release: getRandomDate(Film.RELEASE_YEAR_MIN, Film.RELEASE_YEAR_MAX),
    rating: getRandomRating(),
    duration: getRandomIntegerNumber(Film.DURATION_MIN, Film.DURATION_MAX),
    country: getRandomArrayItem(COUNTRIES),
    ageLimit: getRandomIntegerNumber(Film.AGE_MIN, Film.AGE_MAX),
    genres: getRandomArray(GENRES, Film.GENRES_MIN, Film.GENRES_MAX),
    poster: `./images/posters/${getRandomArrayItem(POSTERS)}`,
    description: getRandomDescription(DUMMY_TEXTS),
    comments: generateComments(getCommentsCount()),
    watchlist: getRandomBoolean(),
    watched: getRandomBoolean(),
    favorite: getRandomBoolean()
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
