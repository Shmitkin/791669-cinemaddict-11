import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment.js";
import NewCommentComponent from "../components/new-comment.js";
import FilmCardComponent from "../components/film-card.js";

import {ActionType} from "../consts.js";

import {isEscKey} from "../utils/common.js";
import {render, remove, RenderPosition, replace} from "../utils/render.js";

export default class FilmController {
  constructor(container, modalContainer, onChange) {
    this._modalContainer = modalContainer;
    this.isFilmDetailsOpened = false;
    this._container = container;
    this._newCommentComponent = new NewCommentComponent();
    this._filmDetailsComponent = null;
    this._filmCardComponent = null;
    this._film = null;
    this._onChange = onChange;
  }

  render(film) {
    this._film = film;
    this._filmCardComponent = new FilmCardComponent(film);

    const showFilmDetails = () => {
      this._renderFilmDetails(this._film);
    };

    this._filmCardComponent.setOnTitleClickHandler(showFilmDetails);
    this._filmCardComponent.setOnPosterClickHandler(showFilmDetails);
    this._filmCardComponent.setOnCommentsClickHandler(showFilmDetails);

    this._filmCardComponent.setOnWatchlistButtonClick(() => {
      const changes = Object.assign({}, this._film, {isAddedToWatchlist: !this._film.isAddedToWatchlist});
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: changes
      });
    });

    this._filmCardComponent.setOnWatchedButtonClick(() => {
      const changes = Object.assign({}, this._film, {isMarkedAsWatched: !this._film.isMarkedAsWatched});
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: changes
      });
    });

    this._filmCardComponent.setOnFavoriteButtonClick(() => {
      const changes = Object.assign({}, this._film, {isFavorite: !this._film.isFavorite});
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: changes
      });
    });

    render(this._container, this._filmCardComponent);

  }

  replace(film) {
    this._film = film;
    const oldFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(film);

    replace(this._filmCardComponent, oldFilmComponent);

    if (this.isFilmDetailsOpened) {
      const oldFilmDetailsComponent = this._filmDetailsComponent;
      this._filmDetailsComponent = new FilmDetailsComponent(film);

      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    }

  }

  _renderFilmDetails() {
    this._onChange({type: ActionType.VIEW_CHANGE});

    this.isFilmDetailsOpened = !this.isFilmDetailsOpened;
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

    this._filmDetailsComponent.setOnCloseButtonClickHandler(onCloseButtonClick);
    document.addEventListener(`keydown`, onEscKeyDown);

    const filmDetailsCommentsElement = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
    const filmDetailsCommentsListElement = filmDetailsCommentsElement.querySelector(`.film-details__comments-list`);

    this._filmDetailsComponent.setOnWatchlistCheckBoxClick(() => {
      const changes = Object.assign({}, this._film, {isAddedToWatchlist: !this._film.isAddedToWatchlist});
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: changes
      });
    });

    this._filmDetailsComponent.setOnWatchedCheckBoxClick(() => {
      const changes = Object.assign({}, this._film, {isMarkedAsWatched: !this._film.isMarkedAsWatched});
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: changes
      });
    });

    this._filmDetailsComponent.setOnFavoriteCheckBoxClick(() => {
      const changes = Object.assign({}, this._film, {isFavorite: !this._film.isFavorite});
      this._onChange({
        type: ActionType.DATA_CHANGE,
        filmController: this,
        oldData: this._film,
        newData: changes
      });
    });

    render(filmDetailsCommentsElement, this._newCommentComponent);
    this._film.comments.forEach((comment) => render(filmDetailsCommentsListElement, new CommentComponent(comment)));

    render(this._modalContainer, this._filmDetailsComponent, RenderPosition.AFTEREND);
  }
  _removeFilmDetails() {
    if (this.isFilmDetailsOpened) {
      this.isFilmDetailsOpened = !this.isFilmDetailsOpened;
      remove(this._filmDetailsComponent);
    }
  }
}
