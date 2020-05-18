import SortComponent from "../components/sort.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {SortType} from "../consts.js";

export default class SortController {
  constructor(container, filmsModel) {
    this._sortType = null;
    this._container = container;
    this._sortComponent = null;
    this._filmsModel = filmsModel;

    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._filmsModel.addFilterChangeHandler(this._onFilterChange);

  }

  render() {
    this._sortType = SortType.DEFAULT;
    const oldSortComponent = this._sortComponent;
    this._sortComponent = new SortComponent();

    this._sortComponent.setSortTypeChangeHandler(this._onSortChange);

    if (oldSortComponent) {
      replace(this._sortComponent, oldSortComponent);
    } else {
      render(this._container, this._sortComponent, RenderPosition.BEFOREBEGIN);
    }
  }

  _onSortChange(sortType) {
    this._sortType = sortType;
    this._filmsModel.setSortType(this._sortType);
  }

  _onFilterChange() {
    this.render();
  }
}
