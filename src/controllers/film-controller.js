import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment.js";
import NewCommentComponent from "../components/new-comment.js";
import FilmCardComponent from "../components/film-card.js";

import {ActionType, CardButtonType} from "../consts.js";

import {isEscKey} from "../utils/common.js";
import {render, remove, RenderPosition, replace} from "../utils/render.js";

export default class FilmController {
  constructor(container, modalContainer, onChange) {
    this._container = container;
    this._modalContainer = modalContainer;

    this._isFilmDetailsOpened = false;
    this._filmDetailsComponent = null;
    this._filmCardComponent = null;
    this._film = null;

    this._newCommentComponent = new NewCommentComponent();
    this._onChange = onChange;
  }

  render(film) {
    this._film = film;
    this._filmCardComponent = new FilmCardComponent(film);

    const onFilmCardElementClick = () => {
      this._renderFilmDetails(this._film);
    };

    this._filmCardComponent.setTitleClickHandler(onFilmCardElementClick);
    this._filmCardComponent.setPosterClickHandler(onFilmCardElementClick);
    this._filmCardComponent.setCommentsClickHandler(onFilmCardElementClick);

    this._filmCardComponent.setButtonsClickHandler((buttonType) => {
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: this._getFilmChanges(buttonType)
      });
    });

    render(this._container, this._filmCardComponent);
  }

  replace(film) {
    this._film = film;
    const oldFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(film);

    replace(this._filmCardComponent, oldFilmComponent);

    if (this._isFilmDetailsOpened) {
      const oldFilmDetailsComponent = this._filmDetailsComponent;
      this._filmDetailsComponent = new FilmDetailsComponent(film);

      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    }
  }

  _getFilmChanges(buttonType) {
    switch (buttonType) {
      case CardButtonType.WATCHLIST:
        return Object.assign({}, this._film, {isAddedToWatchlist: !this._film.isAddedToWatchlist});
      case CardButtonType.WATCHED:
        return Object.assign({}, this._film, {isMarkedAsWatched: !this._film.isMarkedAsWatched});
      case CardButtonType.FAVORITE:
        return Object.assign({}, this._film, {isFavorite: !this._film.isFavorite});
      default: throw new Error(`Unknown button type`);
    }
  }

  _renderFilmDetails() {
    this._onChange({type: ActionType.VIEW_CHANGE});

    this._isFilmDetailsOpened = !this._isFilmDetailsOpened;
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);

    const onCloseButtonClick = () => {
      this._removeFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (isEscKey(evt)) {
        this._removeFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmDetailsComponent.setCloseButtonClickHandler(onCloseButtonClick);
    document.addEventListener(`keydown`, onEscKeyDown);

    this._filmDetailsComponent.setWatchlistCheckBoxClickHandler(() => {
      const changes = Object.assign({}, this._film, {isAddedToWatchlist: !this._film.isAddedToWatchlist});
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: changes
      });
    });

    this._filmDetailsComponent.setWatchedCheckBoxClickHandler(() => {
      const changes = Object.assign({}, this._film, {isMarkedAsWatched: !this._film.isMarkedAsWatched});
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: changes
      });
    });

    this._filmDetailsComponent.setFavoriteCheckBoxClickHandler(() => {
      const changes = Object.assign({}, this._film, {isFavorite: !this._film.isFavorite});
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: changes
      });
    });

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

  _removeFilmDetails() {
    if (this._isFilmDetailsOpened) {
      this._isFilmDetailsOpened = !this._isFilmDetailsOpened;
      remove(this._filmDetailsComponent);
    }
  }
}
