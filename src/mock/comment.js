import {
  COMMENT_AUTHORS,
  EMOJIS
} from "./comment-data.js";

import {
  DUMMY_TEXTS,
  getRandomArrayItem
} from "./utils.js";

import {getRandomCommentDate} from "./comment-utils.js";

const generateComment = () => {
  return {
    emoji: `images/emoji/${getRandomArrayItem(EMOJIS)}.png`,
    text: getRandomArrayItem(DUMMY_TEXTS),
    author: getRandomArrayItem(COMMENT_AUTHORS),
    date: getRandomCommentDate()
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
