import {KeyboardKey, SortType} from "../consts.js";
import moment from "moment";

export const addProperty = (statement, ifTrue, ifFalse = ``) =>
  statement ? ifTrue : ifFalse;

export const formatDuration = (duration) => {
  return moment(duration * 60 * 1000).utc().format(`h[h] m[m]`);
};

export const getReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

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
