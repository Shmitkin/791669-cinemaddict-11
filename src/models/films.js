import {FilterType, SortType, ViewMode, CardCount} from "../consts.js";

import {filterFilms} from "../utils/filter.js";

import {sortFilms} from "../utils/sort.js";

export default class FilmsModel {
  constructor() {
    this._films = [];
    this._filteredFilms = {
      watchlist: [],
      history: [],
      favorites: [],
      watchedToday: [],
      watchedWeek: [],
      watchedMonth: [],
      watchedYear: []
    };

    this._filterType = FilterType.DEFAULT;
    this._sortType = SortType.DEFAULT;
    this._viewMode = ViewMode.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._viewChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  getFilms() {
    return sortFilms(this.getFilteredFilms(this._filterType), this._sortType);
  }

  getFilmsAll() {
    return this._films;
  }

  getFilmById(id) {
    return this._films.find((film) => film.id === id);
  }

  getFilmsTopRated() {
    return sortFilms(this._films, SortType.RATING_DOWN).slice(0, CardCount.TOP_RATED);
  }

  getFilmsMostCommented() {
    return sortFilms(this._films, SortType.COMMENTS_DOWN).slice(0, CardCount.MOST_COMMENTED);
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._filterFilms();
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
    this._filteredFilms = filterFilms(this._films);
    FilmsModel._callHandlers(this._dataChangeHandlers, id);
  }

  _filterFilms() {
    this._filteredFilms = filterFilms(this._films);
  }

  getStats(dataSet) {
    switch (dataSet) {
      case `user-statistics`:
        return this._filteredFilms.history;
      case `main-navigation`:
        return {
          watchlist: this._filteredFilms.watchlist.length,
          history: this._filteredFilms.history.length,
          favorites: this._filteredFilms.favorites.length
        };
      case `profile-rating`:
        return this._filteredFilms.history.length;
      default: throw new Error(`Unknown DATASET`);
    }
  }

  getFilteredFilms(filterType) {
    switch (filterType) {
      case FilterType.DEFAULT:
        return this._films;
      case FilterType.FAVORITES:
        return this._filteredFilms.favorites;
      case FilterType.WATCHED:
        return this._filteredFilms.history;
      case FilterType.WATCHLIST:
        return this._filteredFilms.watchlist;
      case FilterType.TODAY:
        return this._filteredFilms.watchedToday;
      case FilterType.WEEK:
        return this._filteredFilms.watchedWeek;
      case FilterType.MONTH:
        return this._filteredFilms.watchedMonth;
      case FilterType.YEAR:
        return this._filteredFilms.watchedYear;
      default: return this._filteredFilms;
    }
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
