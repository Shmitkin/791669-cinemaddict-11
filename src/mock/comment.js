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

const generateComment = (id) => {
  return {
    id,
    emoji: getRandomArrayItem(EMOJIS),
    text: getRandomArrayItem(DUMMY_TEXTS),
    author: getRandomArrayItem(COMMENT_AUTHORS),
    date: getRandomDate(Comment.YEAR_MIN, Comment.YEAR_MAX)
  };
};

export const generateCommentId = () => {
  return String(`i` + Math.random());
};

export const generateCommentsId = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateCommentId);
};

export const generateComments = (commentsIds) => {
  return commentsIds.map((id) => generateComment(id));
};

