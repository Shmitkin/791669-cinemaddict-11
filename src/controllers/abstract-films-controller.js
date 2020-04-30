import FilmController from "./film-controller.js";

export default class AbstractFilmsController {
  constructor(container, modalContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._container = container;
    this._modalContainer = modalContainer;

    this._showedFilmsControllers = [];
    this._films = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._updateFilms = this._updateFilms.bind(this);
  }

  render() {
    this._films = this._filmsModel.getFilms();
    this._filmsModel.addDataChangeHandler(this._updateFilms);
  }

  _renderFilms(films) {
    const renderedFilms = films.map((film)=> {
      const filmController = new FilmController(this._container, this._modalContainer, this._onDataChange);
      filmController.render(film);
      return filmController;
    });
    this._showedFilmsControllers = this._showedFilmsControllers.concat(renderedFilms);
  }

  _onDataChange(oldFilmData, newFilmData) {
    this._filmsModel.updateFilm(oldFilmData.id, newFilmData);
  }

  _updateFilms() {
    const oldfilms = this._films;
    this._films = this._filmsModel.getFilms();

    const updatedFilms = this._films.filter((film) => oldfilms.indexOf(film) === -1);
    const updatedFilm = updatedFilms.pop();

    const index = this._showedFilmsControllers.findIndex((controller) => controller.film.id === updatedFilm.id);
    if (index === -1) {
      return;
    }

    this._showedFilmsControllers[index].render(updatedFilm);

  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((controller) => controller.removeFilmDetails());
  }
}
