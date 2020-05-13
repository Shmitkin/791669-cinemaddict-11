import MainNavigationComponent from "../components/main-navigation.js";
import {render, replace} from "../utils/render.js";
import {FilterType} from "../consts.js";
import {getFilteredFilms} from "../utils/filter.js";
import {ViewMode} from "../consts.js";

export default class MainNavigationController {
  constructor(container, filmsModel, onViewModeChange) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._mainNavigationComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._onViewModeChange = onViewModeChange;

    this._filmsModel.addDataChangeHandler(this._onDataChange);
  }

  render() {
    const watchStats = getFilteredFilms(this._filmsModel.getFilmsAll());
    const oldMainNavigationComponent = this._mainNavigationComponent;
    this._mainNavigationComponent = new MainNavigationComponent(watchStats, this._activeFilterType);

    this._mainNavigationComponent.setFilterTypeChangeHandler(this._onFilterChange);

    if (oldMainNavigationComponent) {
      replace(this._mainNavigationComponent, oldMainNavigationComponent);
    } else {
      render(this._container, this._mainNavigationComponent);
    }
  }

  _onFilterChange(filterType) {
    if (filterType === FilterType.STATS) {
      this._onViewModeChange(ViewMode.STATS);
      return;
    }
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this._onViewModeChange(ViewMode.DEFAULT);
  }

  _onDataChange() {
    this.render();
  }
}

