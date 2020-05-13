import {FilterType, SortType, ViewMode} from "../consts.js";

import {getFilteredFilms} from "../utils/filter.js";

import {getSortedFilms} from "../utils/common.js";

export default class FilmsModel {
  constructor() {
    this._films = [];

    this._filterType = FilterType.ALL;
    this._sortType = SortType.DEFAULT;
    this._viewMode = ViewMode.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._viewChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getFilms() {
    return getSortedFilms(getFilteredFilms(this._films, this._filterType), this._sortType);
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
    this._sortType = SortType.DEFAULT;
    this._filterType = filterType;
    FilmsModel._callHandlers(this._filterChangeHandlers);
  }

  setSortType(sortType) {
    this._sortType = sortType;
    FilmsModel._callHandlers(this._sortChangeHandlers);
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

  addSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  static _callHandlers(handlers, id) {
    handlers.forEach((handler) => handler(id));
  }
}
