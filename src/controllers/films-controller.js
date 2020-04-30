import {render, remove, RenderPosition} from "../utils/render.js";
import AbstractFilmsController from "./abstract-films-controller.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import {CardCount, SortType} from "../consts.js";
import {getSortedFilms} from "../utils/common.js";

export default class FilmsListController extends AbstractFilmsController {
  constructor(container, modalContainer, filmsModel) {
    super();
    this._filmsModel = filmsModel;
    this._container = container;
    this._modalContainer = modalContainer;

    this._showingCardsCount = CardCount.DEFAULT_SHOW;
    this._prevCardsCount = this._showingCardsCount;

    this._sortType = SortType.DEFAULT;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render() {
    const films = this._filmsModel.getFilms();
    this._renderFilms(films.slice(0, CardCount.DEFAULT_SHOW));
    this._renderShowMoreButton(films);
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);
    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), this._sortType);

    if (this._showingCardsCount >= sortedFilms.length) {
      return;
    }
    render(this._container, this._showMoreButtonComponent, RenderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(() => {
      this._prevCardsCount = this._showingCardsCount;
      this._showingCardsCount += CardCount.SHOW_MORE;

      this._renderFilms(sortedFilms.slice(this._prevCardsCount, this._showingCardsCount));
      if (this._showingCardsCount >= sortedFilms.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  updateFilms(sortType) {
    this._sortType = sortType;
    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), this._sortType);
    this._removeFilms();
    this._renderFilms(sortedFilms.slice(0, CardCount.DEFAULT_SHOW));
    this._renderShowMoreButton();
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((controller) => controller.destroy());
    this._showedFilmsControllers = [];
    this._showingCardsCount = CardCount.DEFAULT_SHOW;
  }
}
