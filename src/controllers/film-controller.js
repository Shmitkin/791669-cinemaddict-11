import FilmDetailsInfoComponent from "../components/film-details-info.js";
import FilmDetailsComponent from "../components/film-details.js";
import FilmCardComponent from "../components/film-card.js";
import CommentsController from "./comments-controller.js";

import {CardButtonType} from "../consts.js";

import {isEscKey} from "../utils/common.js";
import {render, remove, replace, RenderPosition} from "../utils/render.js";

export default class FilmController {
  constructor(container, modalContainer, onDataChange, onViewChange, commentsModel) {
    this._container = container;
    this._modalContainer = modalContainer;
    this._commentsModel = commentsModel;

    this._filmDetailsComponent = null;
    this._filmDetailsInfoComponent = null;
    this._filmCardComponent = null;
    this._film = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onControlClick = this._onControlClick.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
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
    remove(this._filmCardComponent);
    this.removeFilmDetails();
  }

  removeFilmDetails() {
    if (this._filmDetailsComponent) {
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _renderFilmDetails() {
    this._onViewChange();
    this._filmDetailsComponent = new FilmDetailsComponent();
    this._filmDetailsInfoComponent = new FilmDetailsInfoComponent(this._film);
    this._filmDetailsInfoComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
    this._filmDetailsInfoComponent.setFilmDetailsControlsClickHandler(this._onControlClick);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    const commentsController = new CommentsController(this._filmDetailsInfoComponent.getElement(), this._commentsModel);

    render(this._filmDetailsComponent.getElement(), this._filmDetailsInfoComponent);

    commentsController.render(this._film.comments);
    render(this._modalContainer, this._filmDetailsComponent, RenderPosition.AFTEREND);
  }

  //  _renderComments() {
  //    render(this._filmDetailsInfoComponent.getElement(), new CommentsComponent(this._film.comments));
  //  }

  _onControlClick(buttonType) {
    const getFilmChanges = () => {
      switch (buttonType) {
        case CardButtonType.WATCHLIST:
          return Object.assign({}, this._film, {watchlist: !this._film.watchlist});
        case CardButtonType.WATCHED:
          return Object.assign({}, this._film, {watched: !this._film.watched});
        case CardButtonType.FAVORITE:
          return Object.assign({}, this._film, {favorite: !this._film.favorite});
        default: throw new Error(`Unknown button type`);
      }
    };

    this._onDataChange(this._film, getFilmChanges());
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
}
