import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment.js";
import NewCommentComponent from "../components/new-comment.js";
import FilmCardComponent from "../components/film-card.js";

import {CardButtonType} from "../consts.js";

import {isEscKey} from "../utils/common.js";
import {render, remove, replace, RenderPosition} from "../utils/render.js";

export default class FilmController {
  constructor(container, modalContainer, onDataChange) {
    this._container = container;
    this._modalContainer = modalContainer;

    this._filmDetailsComponent = null;
    this._filmCardComponent = null;
    this.film = null;

    this._newCommentComponent = new NewCommentComponent();
    this._onDataChange = onDataChange;
    this._onControlClick = this._onControlClick.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this.film = film;

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

    this._filmDetailsComponent = new FilmDetailsComponent(this._film);
    this._filmDetailsComponent.setCloseButtonClickHandler(this._onCloseButtonClick);
    this._filmDetailsComponent.setPopUpControlsClickHandler(this._onControlClick);
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

  _onControlClick(buttonType) {
    const getFilmChanges = () => {
      switch (buttonType) {
        case CardButtonType.WATCHLIST:
          return Object.assign({}, this.film, {isAddedToWatchlist: !this.film.isAddedToWatchlist});
        case CardButtonType.WATCHED:
          return Object.assign({}, this.film, {isMarkedAsWatched: !this.film.isMarkedAsWatched});
        case CardButtonType.FAVORITE:
          return Object.assign({}, this.film, {isFavorite: !this.film.isFavorite});
        default: throw new Error(`Unknown button type`);
      }
    };

    this._onDataChange(this.film, getFilmChanges());
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
