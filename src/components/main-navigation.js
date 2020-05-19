import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../consts.js";

const ACTIVE_CLASS = `main-navigation__item--active`;

export default class MainNavigation extends AbstractComponent {
  constructor(watchStats, currentFilterType) {
    super();
    this._watchStats = watchStats;
    this._currentFilterType = currentFilterType;
    this._activeElement = this.getElement().querySelector(`.${ACTIVE_CLASS}`);
  }

  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    const {watchlist, history, favorites} = this._watchStats;

    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" data-filter-type="${FilterType.DEFAULT}" class="main-navigation__item ${this._isActiveFilter(FilterType.DEFAULT)}">All movies</a>
          <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item ${this._isActiveFilter(FilterType.WATCHLIST)}">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
          <a href="#history" data-filter-type="${FilterType.WATCHED}" class="main-navigation__item ${this._isActiveFilter(FilterType.WATCHED)}">History <span class="main-navigation__item-count">${history}</span></a>
          <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item ${this._isActiveFilter(FilterType.FAVORITES)}">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.dataset.filterType;
      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;
      this._setActiveElement(evt.target);

      handler(this._currentFilterType);
    });
  }

  setStatsClickHandler(handler) {
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, (evt) => {
      this._currentFilterType = null;
      evt.preventDefault();
      this._setActiveElement(evt.target);
      handler();
    });
  }

  _isActiveFilter(filterType) {
    return filterType === this._currentFilterType ? ACTIVE_CLASS : ``;
  }

  _setActiveElement(element) {
    this._activeElement.classList.remove(ACTIVE_CLASS);
    this._activeElement = element;
    this._activeElement.classList.add(ACTIVE_CLASS);
  }
}
