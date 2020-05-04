import AbstractComponent from "./abstract-component.js";
import {FilterType} from "../consts.js";

const ACTIVE_CLASS = `main-navigation__item--active`;

export default class MainNavigation extends AbstractComponent {
  constructor(watchStats, currentFilterType) {
    super();
    this._watchStats = watchStats;
    this._currentFilterType = currentFilterType;
  }

  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    const {watchlist, history, favorites} = this._watchStats;
    const activeFilter = this._currentFilterType;
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item ${activeFilter === FilterType.ALL ? ACTIVE_CLASS : ``}">All movies</a>
          <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item ${activeFilter === FilterType.WATCHLIST ? ACTIVE_CLASS : ``}">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
          <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item ${activeFilter === FilterType.HISTORY ? ACTIVE_CLASS : ``}">History <span class="main-navigation__item-count">${history.length}</span></a>
          <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item ${activeFilter === FilterType.FAVORITES ? ACTIVE_CLASS : ``}">Favorites <span class="main-navigation__item-count">${favorites.length}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  setFilerTypeChangeHandler(handler) {
    let activeElement = this.getElement().querySelector(`.${ACTIVE_CLASS}`);

    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      const filterType = evt.target.dataset.filterType;

      if (this._currentFilterType === filterType) {
        return;
      }

      if (filterType === undefined) {
        return;
      }

      this._currentFilterType = filterType;

      activeElement.classList.remove(ACTIVE_CLASS);
      activeElement = evt.target;
      activeElement.classList.add(ACTIVE_CLASS);

      handler(this._currentFilterType);
    });
  }
}
