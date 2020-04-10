import {
  getRandomArray,
  getRandomIntegerNumber
} from "./utils.js";

import {
  MONTH_NAMES,
  MINUTES_IN_HOUR,
  DAYS_IN_MONTH
} from "../consts.js";

const Film = {
  RELEASE_YEAR_MIN: 1945,
  RELEASE_YEAR_MAX: 2020,
  COMMENTS_MIN: 0,
  COMMENTS_MAX: 5,
  DESCRIPTION_SENTENCES_MIN: 1,
  DESCRIPTION_SENTENCES_MAX: 5,
  GENRES_MIN: 1,
  GENRES_MAX: 4,
  CAST_MIN: 2,
  CAST_MAX: 5,
  DURATION_MIN: 30,
  DURATION_MAX: 180,
  RATING_MIN: 1,
  RATING_MAX: 10,
  WRITERS_MIN: 1,
  WRITERS_MAX: 3
};

const getRandomWriters = (writers) =>
  getRandomArray(writers, Film.WRITERS_MIN, Film.WRITERS_MAX).join(`, `);

const getCommentsCount = () =>
  getRandomIntegerNumber(Film.COMMENTS_MIN, Film.COMMENTS_MAX);

const getRandomDescription = (description) =>
  getRandomArray(description, Film.DESCRIPTION_SENTENCES_MIN, Film.DESCRIPTION_SENTENCES_MAX).join(` `);

const getRandomGenres = (genres) =>
  getRandomArray(genres, Film.GENRES_MIN, Film.GENRES_MAX);

const getRandomCast = (actors) =>
  getRandomArray(actors, Film.CAST_MIN, Film.CAST_MIN).join(`, `);

const getRandomDuration = () => {
  const duration = getRandomIntegerNumber(Film.DURATION_MIN, Film.DURATION_MAX);
  const hours = parseInt(duration / MINUTES_IN_HOUR, 10);
  const minutes = duration % MINUTES_IN_HOUR;
  return `${hours}h ${minutes}m`;
};

const getRandomRating = () => {
  const randomNumber = (Film.RATING_MIN + Math.random() * (Film.RATING_MAX - Film.RATING_MIN)) * 10;
  const rating = Math.round(randomNumber) / 10;
  return rating;
};

const getRandomReleaseDate = () => {
  const ReleaseDate = {
    day: getRandomIntegerNumber(1, DAYS_IN_MONTH),
    month: MONTH_NAMES[getRandomIntegerNumber(0, MONTH_NAMES.length - 1)],
    year: getRandomIntegerNumber(Film.RELEASE_YEAR_MIN, Film.RELEASE_YEAR_MAX)
  };
  return ReleaseDate;
};


export {
  getRandomWriters,
  getRandomCast,
  getRandomRating,
  getRandomReleaseDate,
  getRandomDuration,
  getRandomGenres,
  getRandomDescription,
  getCommentsCount
};
