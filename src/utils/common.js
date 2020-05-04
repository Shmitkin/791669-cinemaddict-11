import {MINUTES_IN_HOUR, KeyboardKey, SortType} from "../consts.js";

export const addProperty = (statement, ifTrue, ifFalse = ``) =>
  statement ? ifTrue : ifFalse;

export const formatDuration = (duration) => {
  const hours = parseInt(duration / MINUTES_IN_HOUR, 10);
  const minutes = duration % MINUTES_IN_HOUR;
  return `${hours}h ${minutes}m`;
};

export const castTimeFormat = (value) =>
  String(value).padStart(2, `0`);

export const isEscKey = ({key}) => key === KeyboardKey.ESCAPE || key === KeyboardKey.ESC;

export const addKey = (key) => {
  return (a, b) => b[key] - a[key];
};

export const getSortedArrayByKey = (array, key) => {
  const newArray = array.slice();
  return newArray.sort(addKey(key));
};

export const getSortedFilms = ([...films], sortType) => {
  switch (sortType) {
    case SortType.DATE_DOWN:
      return getSortedArrayByKey(films, `release`);
    case SortType.RATING_DOWN:
      return getSortedArrayByKey(films, `rating`);
    case SortType.DEFAULT:
      return films;
    default: throw new Error(`Unknown sort type: ${sortType}`);
  }
};
