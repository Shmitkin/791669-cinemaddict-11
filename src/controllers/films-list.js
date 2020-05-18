import {render, remove, RenderPosition} from "../utils/render.js";
import AbstractFilmsController from "./abstract-films-controller.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import {CardCount} from "../consts.js";
import SortController from "./sort.js";

export default class FilmsListController extends AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, api) {
    super(container, modalContainer, filmsModel, api);

    this._films = null;

    this._showingCardsCount = CardCount.DEFAULT_SHOW;
    this._prevCardsCount = this._showingCardsCount;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortController = new SortController(container, filmsModel);

    this._updateFilmsContainer = this._updateFilmsContainer.bind(this);

    this._filmsModel.addFilterChangeHandler(this._updateFilmsContainer);
    this._filmsModel.addSortChangeHandler(this._updateFilmsContainer);

  }

  render() {
    super.render();
    this._sortController.render();
    this._films = this._filmsModel.getData(`films-list`);

    this._renderFilms(this._films.slice(0, CardCount.DEFAULT_SHOW));
    if (this._films.length > CardCount.DEFAULT_SHOW) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListContainerComponent.getElement(), this._showMoreButtonComponent, RenderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._prevCardsCount = this._showingCardsCount;
      this._showingCardsCount += CardCount.SHOW_MORE;

      this._renderFilms(this._films.slice(this._prevCardsCount, this._showingCardsCount));
      if (this._showingCardsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _updateFilmsContainer() {
    this._films = this._filmsModel.getData(`films-list`);
    this._removeFilms();
    remove(this._showMoreButtonComponent);

    this._renderFilms(this._films.slice(0, CardCount.DEFAULT_SHOW));
    if (this._films.length > CardCount.DEFAULT_SHOW) {
      this._renderShowMoreButton();
    }
  }
}
