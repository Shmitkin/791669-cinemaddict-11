import FilmController from "./film-controller.js";
import {FilmCardActionType} from "../consts.js";

export default class AbstractFilmsController {
  constructor(container, modalContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._container = container;
    this._modalContainer = modalContainer;

    this._showedFilmsControllers = [];

    this._onChange = this._onChange.bind(this);
  }

  _renderFilms(films) {
    const renderedFilms = films.map((film)=> {
      const filmController = new FilmController(this._container, this._modalContainer, this._onChange);
      filmController.render(film);
      return filmController;
    });
    this._showedFilmsControllers = this._showedFilmsControllers.concat(renderedFilms);
  }

  _onChange(action) {
    switch (action.type) {
      case FilmCardActionType.DATA_CHANGE:
        const isSuccess = this._filmsModel.updateFilm(action.oldData.id, action.newData);

        if (isSuccess) {
          action.filmController.render(action.newData);
        }
        break;

      case FilmCardActionType.VIEW_CHANGE:
        this._showedFilmsControllers.forEach((controller) => controller.removeFilmDetails());
        break;
    }
  }
}
