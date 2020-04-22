import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comment.js";
import NewCommentComponent from "../components/new-comment.js";
import FilmCardComponent from "../components/film-card.js";

import {isEscKey} from "../utils/common.js";
import {render, remove, RenderPosition, replace} from "../utils/render.js";

const modalContainer = document.querySelector(`.footer`);
const modalPlace = RenderPosition.AFTEREND;

export default class FilmController {
  constructor(container, onDataChange) {
    this._container = container;
    this._newCommentComponent = new NewCommentComponent();
    this._filmDetailsComponent = null;
    this._filmCardComponent = null;
    this._film = null;
    this._modalContainer = modalContainer;
    this._modalPlace = modalPlace;
    this._onDataChange = onDataChange;
  }

  _removeFilmDetails() {
    remove(this._filmDetailsComponent);
  }

  renderFilmDetails() {
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
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isAddedToWatchlist: !this._film.isAddedToWatchlist
      }));
    });

    this._filmDetailsComponent.setOnWatchedCheckBoxClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isMarkedAsWatched: !this._film.isMarkedAsWatched
      }));
    });

    this._filmDetailsComponent.setOnFavoriteCheckBoxClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite
      }));
    });

    render(filmDetailsCommentsElement, this._newCommentComponent);
    this._film.comments.forEach((comment) => render(filmDetailsCommentsListElement, new CommentComponent(comment)));

    render(this._modalContainer, this._filmDetailsComponent, this._modalPlace);
  }

  render(film) {
    this._film = film;
    const oldFilmComponent = this._filmCardComponent;
    const oldfilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    const showFilmDetails = () => {
      this.renderFilmDetails(this._film);
    };

    this._filmCardComponent.setOnTitleClickHandler(showFilmDetails);
    this._filmCardComponent.setOnPosterClickHandler(showFilmDetails);
    this._filmCardComponent.setOnCommentsClickHandler(showFilmDetails);

    this._filmCardComponent.setOnWatchlistButtonClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isAddedToWatchlist: !this._film.isAddedToWatchlist
      }));
    });

    this._filmCardComponent.setOnWatchedButtonClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isMarkedAsWatched: !this._film.isMarkedAsWatched
      }));
    });

    this._filmCardComponent.setOnFavoriteButtonClick(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        isFavorite: !this._film.isFavorite
      }));
    });

    if (oldFilmComponent && oldfilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldfilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

}
