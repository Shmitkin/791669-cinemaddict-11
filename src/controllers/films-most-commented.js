import AbstractFilmsController from "./abstract-films-controller.js";

export default class MostCommentedController extends AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, api) {
    super(container, modalContainer, filmsModel, api);

    this._updateMostCommentedFilms = this._updateMostCommentedFilms.bind(this);
    this._filmsModel.addDataChangeHandler(this._updateMostCommentedFilms);
  }

  render() {
    this._films = this._filmsModel.getData(`most-commented-films`);
    super.render();
    this._renderFilms(this._films);
  }

  _updateMostCommentedFilms() {
    const newFilms = this._filmsModel.getData(`most-commented-films`);

    if (MostCommentedController._isFilmsIndent(newFilms, this._films)) {
      return;
    }

    this._films = newFilms;
    this._removeFilms();
    this._renderFilms(this._films);
  }

  static _isFilmsIndent(newFilms, oldFilms) {
    if (newFilms.length !== oldFilms.length) {
      return false;
    }
    for (let i = 0; i < newFilms.length; i++) {
      if (newFilms[i].id !== oldFilms[i].id) {
        return false;
      }
    }
    return true;
  }
}

