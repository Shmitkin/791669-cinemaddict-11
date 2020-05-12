import {KeyboardKey, SortType, MINUTES_IN_HOUR} from "../consts.js";

export const addProperty = (statement, ifTrue, ifFalse = ``) =>
  statement ? ifTrue : ifFalse;

export const formatDuration = (duration, type) => {
  const hours = parseInt(duration / MINUTES_IN_HOUR, 10);
  const minutes = duration % MINUTES_IN_HOUR;
  switch (type) {
    case `film-stat`:
      return `${hours}h ${minutes}m`;
    case `user-stat`:
      return {hours, minutes};
    default: throw new Error(`Unknown type to format duration`);

  }
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
