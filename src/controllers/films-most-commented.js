import AbstractFilmsController from "./abstract-films-controller.js";

export default class MostCommentedController extends AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, api) {
    super(container, modalContainer, filmsModel, api);

    this._updateMostCommentedFilms = this._updateMostCommentedFilms.bind(this);
    this._filmsModel.addDataChangeHandler(this._updateMostCommentedFilms);

  }

  render() {
    this._films = this._filmsModel.getFilmsMostCommented();
    super.render();
    this._renderFilms(this._films);
  }

  _updateMostCommentedFilms() {
    this._films = this._filmsModel.getFilmsMostCommented();

    const currentFilmsIds = this._showedFilmsControllers.map((controller) => controller._film.id);
    const newFilmsIds = this._films.map((film) => film.id);

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
    this._renderFilms(this._films);
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((controller) => controller.destroy());
    this._showedFilmsControllers = [];
  }
}
