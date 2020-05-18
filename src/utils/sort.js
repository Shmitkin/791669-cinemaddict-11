import {SortType} from "../consts.js";
import moment from "moment";

export const sortFilms = ([...films], sortType) => {
  switch (sortType) {
    case SortType.DATE_DOWN:
      return films.sort((a, b) => moment(b.release).diff(moment(a.release)));
    case SortType.RATING_DOWN:
      return films.sort((a, b) => b.rating - a.rating);
    case SortType.COMMENTS_DOWN:
      return films.sort((a, b) => b.comments.length - a.comments.length);
    case SortType.DEFAULT:
      return films;
    default: throw new Error(`Unknown sort type: ${sortType}`);
  }
};
