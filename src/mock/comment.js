import {
  Authors,
  Emoji
} from "./comment-data.js";

import {
  DummyText,
  getRandomArrayItem
} from "./utils.js";

import {getRandomCommentDate} from "./comment-utils.js";

const generateComment = () => {
  return {
    emoji: `./images/emoji/${getRandomArrayItem(Emoji)}.png`,
    text: getRandomArrayItem(DummyText),
    author: getRandomArrayItem(Authors),
    date: getRandomCommentDate()
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
