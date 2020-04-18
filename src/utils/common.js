import {MINUTES_IN_HOUR} from "../consts.js";

const addProperty = (statement, ifTrue, ifFalse = ``) =>
  statement ? ifTrue : ifFalse;

const formatDuration = (duration) => {
  const hours = parseInt(duration / MINUTES_IN_HOUR, 10);
  const minutes = duration % MINUTES_IN_HOUR;
  return `${hours}h ${minutes}m`;
};

const castTimeFormat = (value) =>
  String(value).padStart(2, `0`);

export {addProperty, formatDuration, castTimeFormat};
