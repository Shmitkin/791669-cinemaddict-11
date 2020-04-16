import {MINUTES_IN_HOUR} from "./consts.js";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const addProperty = (statement, ifTrue, ifFalse = ``) =>
  statement ? ifTrue : ifFalse;

const formatDuration = (duration) => {
  const hours = parseInt(duration / MINUTES_IN_HOUR, 10);
  const minutes = duration % MINUTES_IN_HOUR;
  return `${hours}h ${minutes}m`;
};

const castTimeFormat = (value) =>
  String(value).padStart(2, `0`);

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export {addProperty, formatDuration, castTimeFormat, createElement, RenderPosition, render};
