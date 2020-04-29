import {MINUTES_IN_HOUR, KeyboardKey, SortType} from "../consts.js";

const addProperty = (statement, ifTrue, ifFalse = ``) =>
  statement ? ifTrue : ifFalse;

const formatDuration = (duration) => {
  const hours = parseInt(duration / MINUTES_IN_HOUR, 10);
  const minutes = duration % MINUTES_IN_HOUR;
  return `${hours}h ${minutes}m`;
};

const castTimeFormat = (value) =>
  String(value).padStart(2, `0`);

const isEscKey = ({key}) => key === KeyboardKey.ESCAPE || key === KeyboardKey.ESC;

const addKey = (key) => {
  return (a, b) => b[key] - a[key];
};

const getSortedArrayByKey = (array, key) => {
  const newArray = array.slice();
  return newArray.sort(addKey(key));
};

const getSortedFilms = ([...films], sortType) => {
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

export {addProperty, formatDuration, castTimeFormat, isEscKey, getSortedFilms, getSortedArrayByKey};
