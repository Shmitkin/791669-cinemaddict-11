import MainNavigationComponent from "../components/main-navigation.js";
import {render, replace} from "../utils/render.js";
import {FilterType} from "../consts.js";
import {ViewMode} from "../consts.js";

export default class MainNavigationController {
  constructor(container, filmsModel, onViewModeChange) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.DEFAULT;
    this._mainNavigationComponent = null;

    this._update = this._update.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._onViewModeChange = onViewModeChange;

    this._filmsModel.addDataChangeHandler(this._update);
  }

  render() {
    const watchStats = this._filmsModel.getStats(`main-navigation`);
    this._mainNavigationComponent = new MainNavigationComponent(watchStats, this._activeFilterType);

    this._mainNavigationComponent.setFilterTypeChangeHandler(this._onFilterChange);
    render(this._container, this._mainNavigationComponent);
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

  _update() {
    const watchStats = this._filmsModel.getStats(`main-navigation`);

    const oldMainNavigationComponent = this._mainNavigationComponent;
    this._mainNavigationComponent = new MainNavigationComponent(watchStats, this._activeFilterType);
    this._mainNavigationComponent.setFilterTypeChangeHandler(this._onFilterChange);
    replace(this._mainNavigationComponent, oldMainNavigationComponent);
  }
}

