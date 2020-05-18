import FilmDetailsInfoComponent from "../components/film-details-info.js";
import FilmDetailsComponent from "../components/film-details.js";
import FilmCardComponent from "../components/film-card.js";
import CommentsController from "./comments-controller.js";
import FilmModel from "../models/film.js";
import {CardButtonType} from "../consts.js";
import {isEscKey} from "../utils/common.js";
import {render, remove, replace, RenderPosition} from "../utils/render.js";

export default class FilmController {
  constructor(container, modalContainer, onDataChange, api) {
    this._container = container;
    this._modalContainer = modalContainer;
    this._api = api;

    this._filmDetailsComponent = null;
    this._filmDetailsInfoComponent = null;
    this._filmCardComponent = null;
    this._film = null;
    this._commentsController = null;
    this._filmDetailsOpened = false;
    this._needToRemove = false;

    this._onDataChange = onDataChange;

    this._onControlClick = this._onControlClick.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
  }

  render(film) {
    this._film = film;

    const oldfilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(film);

    this._filmCardComponent.setTitleClickHandler(this._onFilmCardClick);
    this._filmCardComponent.setPosterClickHandler(this._onFilmCardClick);
    this._filmCardComponent.setCommentsClickHandler(this._onFilmCardClick);
    this._filmCardComponent.setCardControlsClickHandler(this._onControlClick);

    if (oldfilmCardComponent) {
      replace(this._filmCardComponent, oldfilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

  destroy() {
    if (this._filmDetailsOpened) {
      return this;
    }
    remove(this._filmCardComponent);
    this.removeFilmDetails();
    return null;
  }

  removeFilmDetails() {
    if (this._filmDetailsComponent !== null && this._filmDetailsOpened) {
      this._filmDetailsOpened = false;
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._commentsController.removeListeners();
      if (this._needToRemove) {
        this.destroy();
      }
    }
  }

  setDelayedRemove() {
    this._needToRemove = true;
  }


  _renderFilmDetails() {
    this._onDataChange({
      type: `view-change`
    });
    this._filmDetailsOpened = true;

    this._filmDetailsComponent = new FilmDetailsComponent();
    this._filmDetailsInfoComponent = new FilmDetailsInfoComponent(this._film);
    this._commentsController = new CommentsController(this._filmDetailsInfoComponent.getElement(), this._onCommentsDataChange, this._api, this._film.id);

    this._filmDetailsInfoComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
    this._filmDetailsInfoComponent.setFilmDetailsControlsClickHandler(this._onControlClick);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    render(this._filmDetailsComponent.getElement(), this._filmDetailsInfoComponent);
    render(this._modalContainer, this._filmDetailsComponent, RenderPosition.AFTEREND);
    this._commentsController.render(this._film.comments);
  }

  _onControlClick(controlType) {
    this._onDataChange({
      type: `controls-change`,
      id: this._film.id,
      newData: this._getFilmChanges(controlType)
    });
  }

  _getFilmChanges(controlType) {
    const newFilm = FilmModel.clone(this._film);
    switch (controlType) {
      case CardButtonType.WATCHLIST:
        newFilm.watchlist = !newFilm.watchlist;
        return newFilm;
      case CardButtonType.WATCHED:
        newFilm.watched = !newFilm.watched;
        newFilm.watchingDate = newFilm.watched ? new Date() : null;
        return newFilm;
      case CardButtonType.FAVORITE:
        newFilm.favorite = !newFilm.favorite;
        return newFilm;
      default: throw new Error(`Unknown button type`);
    }
  }

  _onFilmCardClick() {
    this._renderFilmDetails();
  }

  _onCloseButtonClick() {
    this.removeFilmDetails();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (isEscKey(evt)) {
      this.removeFilmDetails();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onCommentsDataChange({type, data}) {
    switch (type) {
      case `adding-comment`:
        this._onDataChange({
          type: `add-comment`,
          id: this._film.id,
          newData: new FilmModel(data)
        });
        break;

      case `deleting-comment`:
        const newFilm = FilmModel.clone(this._film);
        newFilm.comments = data;
        this._onDataChange({
          type: `delete-comment`,
          id: this._film.id,
          newData: newFilm
        });
        break;
    }
  }
}
