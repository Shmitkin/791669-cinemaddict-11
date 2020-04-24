import AbstractComponent from "./abstract-component.js";
import {SortType} from "../consts.js";

const ACTIVE_CLASS = `sort__button--active`;

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
    this._activeButton = this.getElement().querySelector(`.${ACTIVE_CLASS}`);
  }
  getTemplate() {
    return this._createTemplate();
  }
  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      this._activeButton.classList.remove(ACTIVE_CLASS);
      this._activeButton = evt.target;
      this._activeButton.classList.add(ACTIVE_CLASS);

      handler(this._currenSortType);
    });
  }

  _createTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-sort-type="${SortType.DATE_DOWN}" class="sort__button">Sort by date</a></li>
        <li><a href="#" data-sort-type="${SortType.RATING_DOWN}" class="sort__button">Sort by rating</a></li>
      </ul>`
    );
  }
}
