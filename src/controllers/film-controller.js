import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment.js";
import NewCommentComponent from "../components/new-comment.js";
import FilmCardComponent from "../components/film-card.js";

import {FilmCardActionType, CardButtonType} from "../consts.js";

import {isEscKey} from "../utils/common.js";
import {render, remove, replace, RenderPosition} from "../utils/render.js";

export default class FilmController {
  constructor(container, modalContainer, onChange) {
    this._container = container;
    this._modalContainer = modalContainer;

    this._filmDetailsComponent = null;
    this._filmCardComponent = null;
    this._film = null;

    this._newCommentComponent = new NewCommentComponent();
    this._onChange = onChange;
    this._onDataChange = this._onDataChange.bind(this);
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
    this._filmCardComponent.setCardControlsClickHandler(this._onDataChange);

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

  _onDataChange(buttonType) {
    const getFilmChanges = () => {
      switch (buttonType) {
        case CardButtonType.WATCHLIST:
          return Object.assign({}, this._film, {isAddedToWatchlist: !this._film.isAddedToWatchlist});
        case CardButtonType.WATCHED:
          return Object.assign({}, this._film, {isMarkedAsWatched: !this._film.isMarkedAsWatched});
        case CardButtonType.FAVORITE:
          return Object.assign({}, this._film, {isFavorite: !this._film.isFavorite});
        default: throw new Error(`Unknown button type`);
      }
    };

    this._onChange({
      type: FilmCardActionType.DATA_CHANGE,
      filmController: this,
      oldData: this._film,
      newData: getFilmChanges()
    });
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

  _renderFilmDetails() {
    this._onChange({type: FilmCardActionType.VIEW_CHANGE});

    this._filmDetailsComponent = new FilmDetailsComponent(this._film);
    this._filmDetailsComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
    this._filmDetailsComponent.setPopUpControlsClickHandler(this._onDataChange);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._renderNewComment();
    this._renderCommentsList();

    render(this._modalContainer, this._filmDetailsComponent, RenderPosition.AFTEREND);
  }

  _renderNewComment() {
    const filmDetailsCommentsElement = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
    render(filmDetailsCommentsElement, this._newCommentComponent);
  }

  _renderCommentsList() {
    const filmDetailsCommentsListElement = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
    this._film.comments.forEach((comment) => render(filmDetailsCommentsListElement, new CommentComponent(comment)));
  }

  removeFilmDetails() {
    if (this._filmDetailsComponent) {
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
