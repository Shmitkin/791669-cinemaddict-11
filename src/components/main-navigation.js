import AbstractComponent from "./abstract-component.js";

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const createMainNavigationTemplate = (watchStats) => {
  const {watchlist, history, favorites} = watchStats;
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
        <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item">History <span class="main-navigation__item-count">${history.length}</span></a>
        <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractComponent {
  constructor(watchStats) {
    super();
    this._watchStats = watchStats;
  }
  getTemplate() {
    return createMainNavigationTemplate(this._watchStats);
  }

  setFilerTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      const filterType = evt.target.dataset.filterType;

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;

      handler(this._currentFilterType);
    });
  }
}
