import AbstractFilmsController from "./abstract-films-controller.js";
import {CardCount} from "../consts.js";

export default class MostCommentedController extends AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, api) {
    super(container, modalContainer, filmsModel, api);

    this._updateMostCommentedFilms = this._updateMostCommentedFilms.bind(this);

  }

  render() {
    super.render();
    this._renderFilms(this._getMostCommentedFilms());
  }

  _updateMostCommentedFilms() {
    const newMostCommentedFilms = this._getMostCommentedFilms();

    const currentFilmsIds = this._showedFilmsControllers.map((controller) => controller._film.id);
    const newFilmsIds = newMostCommentedFilms.map((film) => film.id);

    const isFilmsIndent = (newFilms, oldFilms) => {
      for (let i = 0; i < newFilms.length; i++) {
        if (newFilms[i] !== oldFilms[i]) {
          return false;
        }
      }
      return true;
    };

    if (isFilmsIndent(newFilmsIds, currentFilmsIds)) {
      return;
    }

    this._removeFilms();
    this._renderFilms(newMostCommentedFilms);
  }

  _getMostCommentedFilms() {
    return this._filmsModel.getFilmsAll().slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, CardCount.MOST_COMMENTED);
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((controller) => controller.destroy());
    this._showedFilmsControllers = [];
  }
}
