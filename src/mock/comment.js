import {
  COMMENT_AUTHORS,
  EMOJIS
} from "./comment-data.js";

import {
  DUMMY_TEXTS,
  getRandomArrayItem,
  getRandomDate
} from "./utils.js";

const Comment = {
  YEAR_MIN: 2014,
  YEAR_MAX: 2020
};

const generateComment = () => {
  return {
    emoji: getRandomArrayItem(EMOJIS),
    text: getRandomArrayItem(DUMMY_TEXTS),
    author: getRandomArrayItem(COMMENT_AUTHORS),
    date: getRandomDate(Comment.YEAR_MIN, Comment.YEAR_MAX)
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
