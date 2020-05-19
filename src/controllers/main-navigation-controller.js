import MainNavigationComponent from "../components/main-navigation.js";
import {render, replace} from "../utils/render.js";
import {FilterType} from "../consts.js";
import {ViewMode} from "../consts.js";

export default class MainNavigationController {
  constructor(container, filmsModel, onViewModeChange) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._onViewModeChange = onViewModeChange;

    this._activeFilterType = FilterType.DEFAULT;
    this._mainNavigationComponent = null;
    this._watchStats = null;

    this._update = this._update.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onStatsClick = this._onStatsClick.bind(this);

    this._filmsModel.addDataChangeHandler(this._update);
  }

  render() {
    this._watchStats = this._filmsModel.getData(`main-navigation`);
    this._mainNavigationComponent = new MainNavigationComponent(this._watchStats, this._activeFilterType);
    this._mainNavigationComponent.setFilterTypeChangeHandler(this._onFilterChange);
    this._mainNavigationComponent.setStatsClickHandler(this._onStatsClick);
    render(this._container, this._mainNavigationComponent);
  }

  _update() {
    const oldWatchStats = this._watchStats;
    this._watchStats = this._filmsModel.getData(`main-navigation`);
    console.log(oldWatchStats !== this._watchStats)
    console.log(oldWatchStats);
    console.log(this._watchStats);

    if (oldWatchStats !== this._watchStats) {
      const oldMainNavigationComponent = this._mainNavigationComponent;
      this._mainNavigationComponent = new MainNavigationComponent(this._watchStats, this._activeFilterType);
      this._mainNavigationComponent.setFilterTypeChangeHandler(this._onFilterChange);
      this._mainNavigationComponent.setStatsClickHandler(this._onStatsClick);
      replace(this._mainNavigationComponent, oldMainNavigationComponent);
    }
  }

  _onStatsClick() {
    this._onViewModeChange(ViewMode.STATS);
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this._onViewModeChange(ViewMode.DEFAULT);
  }
}

