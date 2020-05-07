import FilmController from "./film-controller.js";
import FilmsListContainerComponent from "../components/films-list-container.js";
import {render} from "../utils/render.js";


export default class AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, commentsModel, api) {
    this._commentsModel = commentsModel;
    this._filmsModel = filmsModel;
    this._container = container;
    this._modalContainer = modalContainer;
    this._api = api;

    this._filmsListContainerComponent = new FilmsListContainerComponent();

    this._showedFilmsControllers = [];
    this._films = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._updateFilm = this._updateFilm.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
  }

  render() {
    this._films = this._filmsModel.getFilms();
    this._filmsModel.addDataChangeHandler(this._updateFilm);
    this._filmsModel.addViewChangeHandler(this._closeFilmDetails);
    this._commentsModel.addDataChangeHandler(this._updateFilm);

    render(this._container, this._filmsListContainerComponent);
  }

  _renderFilms(films) {
    const renderedFilms = films.map((film)=> {
      const filmController = new FilmController(this._filmsListContainerComponent.getElement(), this._modalContainer, this._onDataChange, this._onViewChange, this._commentsModel, this._api);
      filmController.render(film);
      return filmController;
    });
    this._showedFilmsControllers = this._showedFilmsControllers.concat(renderedFilms);
  }

  _onDataChange(oldFilmData, newFilmData) {
    this._api.updateFilm(oldFilmData.id, newFilmData)
    .then((filmModel) => {
      this._filmsModel.updateFilm(oldFilmData.id, filmModel);
    });
  }

  _updateFilm(id) {
    const index = this._showedFilmsControllers.findIndex((controller) => controller._film.id === id);
    if (index === -1) {
      return;
    }

    const updatedFilm = this._filmsModel.getFilmById(id);

    this._showedFilmsControllers[index].render(updatedFilm);
  }

  _onViewChange() {
    this._filmsModel.closeOpenedFilmDetails();
  }

  _closeFilmDetails() {
    this._showedFilmsControllers.forEach((controller) => controller.removeFilmDetails());
  }
}
