import MainNavigationComponent from "../components/main-navigation.js";
import {render} from "../utils/render.js";
import {FilterType} from "../consts.js";
import {getFilteredFilms} from "../utils/filter.js";

export default class MainNavigationController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._mainNavigationComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const watchStats = getFilteredFilms(this._filmsModel.getFilmsAll());
    const mainNavigationComponent = new MainNavigationComponent(watchStats);

    mainNavigationComponent.setFilerTypeChangeHandler(this._onFilterChange);

    render(this._container, mainNavigationComponent);
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}

