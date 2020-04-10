import {
  MONTH_NAMES,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
  DAYS_IN_MONTH
} from "../consts.js";

import {getRandomIntegerNumber} from "./utils.js";

const Comment = {
  MIN_YEAR: 2010,
  MAX_YEAR: 2020
};

const getRandomCommentDate = () => {
  const date = {
    year: getRandomIntegerNumber(Comment.MIN_YEAR, Comment.MAX_YEAR),
    month: getRandomIntegerNumber(1, MONTH_NAMES.length),
    day: getRandomIntegerNumber(1, DAYS_IN_MONTH),
    hours: getRandomIntegerNumber(0, HOURS_IN_DAY),
    minutes: getRandomIntegerNumber(0, MINUTES_IN_HOUR)
  };
  return `${date.year}/${date.month}/${date.day} ${date.hours}:${date.minutes}`;
};

export {getRandomCommentDate};
