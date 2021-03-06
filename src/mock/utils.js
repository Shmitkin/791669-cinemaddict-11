import {
  MONTH_NAMES,
  MINUTES_IN_HOUR,
  HOURS_IN_DAY,
  DAYS_IN_MONTH
} from "../consts.js";

const DUMMY_TEXTS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getShuffledArray = (array) => {
  let j;
  let temp;
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

const getRandomBoolean = () =>
  Math.random() > 0.5;

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomArray = (array, minLength, maxLength) =>
  getShuffledArray(array)
  .slice(0, getRandomIntegerNumber(minLength, maxLength));

const getRandomDate = (minYear, maxYear) => {
  const date = new Date(
      getRandomIntegerNumber(minYear, maxYear),
      getRandomIntegerNumber(0, MONTH_NAMES.length),
      getRandomIntegerNumber(0, DAYS_IN_MONTH),
      getRandomIntegerNumber(0, HOURS_IN_DAY),
      getRandomIntegerNumber(0, MINUTES_IN_HOUR)
  );
  return date;
};

export {
  getRandomArrayItem,
  getRandomArray,
  getRandomIntegerNumber,
  getRandomBoolean,
  getRandomDate,
  DUMMY_TEXTS
};
