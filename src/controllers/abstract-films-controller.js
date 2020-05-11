import FilmController from "./film-controller.js";
import FilmsListContainerComponent from "../components/films-list-container.js";
import {render} from "../utils/render.js";


export default class AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, api) {
    this._filmsModel = filmsModel;
    this._container = container;
    this._modalContainer = modalContainer;
    this._api = api;

    this._filmsListContainerComponent = new FilmsListContainerComponent();

    this._showedFilmsControllers = [];
    this._films = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._updateFilm = this._updateFilm.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
  }

  render() {
    this._films = this._filmsModel.getFilms();
    this._filmsModel.addDataChangeHandler(this._updateFilm);
    this._filmsModel.addViewChangeHandler(this._closeFilmDetails);

    render(this._container, this._filmsListContainerComponent);
  }

  _renderFilms(films) {
    const renderedFilms = films.map((film)=> {
      const filmController = new FilmController(this._filmsListContainerComponent.getElement(), this._modalContainer, this._onDataChange, this._api);
      filmController.render(film);
      return filmController;
    });
    this._showedFilmsControllers = this._showedFilmsControllers.concat(renderedFilms);
  }

  _onDataChange({type, id, newData}) {
    switch (type) {
      case `controls-change`:
        this._api.updateFilm(id, newData)
        .then((filmModel) => {
          this._filmsModel.updateFilm(id, filmModel);
        });
        break;
      case `delete-comment`:
        this._filmsModel.updateFilm(id, newData);
        break;
      case `add-comment`:
        this._filmsModel.updateFilm(id, newData);
        break;
      case `view-change`:
        this._filmsModel.closeOpenedFilmDetails();
        break;
    }
  }

  _updateFilm(id) {
    const index = this._showedFilmsControllers.findIndex((controller) => controller._film.id === id);
    if (index === -1) {
      return;
    }

    const updatedFilm = this._filmsModel.getFilmById(id);

    this._showedFilmsControllers[index].render(updatedFilm);
  }

  _closeFilmDetails() {
    this._showedFilmsControllers.forEach((controller) => controller.removeFilmDetails());
  }
}
