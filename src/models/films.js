import {FilterType} from "../consts.js";

import {getFilteredFilms} from "../utils/filter.js";

export default class FilmsModel {
  constructor() {
    this._films = [];

    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._viewChangeHandlers = [];
  }

  getFilms() {
    return getFilteredFilms(this._films, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  getFilmById(id) {
    return this._films.find((film) => film.id === id);
  }

  setFilms(films) {
    this._films = Array.from(films);
    FilmsModel._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    FilmsModel._callHandlers(this._filterChangeHandlers);
  }

  closeOpenedFilmDetails() {
    FilmsModel._callHandlers(this._viewChangeHandlers);
  }

  updateFilm(id, newData) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    FilmsModel._callHandlers(this._dataChangeHandlers, id);
  }

  addDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  addFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  addViewChangeHandler(handler) {
    this._viewChangeHandlers.push(handler);
  }

  static _callHandlers(handlers, id) {
    handlers.forEach((handler) => handler(id));
  }
}
