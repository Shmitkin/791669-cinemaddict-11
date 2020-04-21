import FilmDetailsComponent from "../components/film-details.js";
import FilmControlsComponent from "../components/film-controls.js";
import CommentComponent from "../components/comment.js";
import NewCommentComponent from "../components/new-comment.js";
import FilmCardComponent from "../components/film-card.js";

import {isEscKey} from "../utils/common.js";
import {render, remove, RenderPosition} from "../utils/render.js";

const modalContainer = document.querySelector(`.footer`);
const modalPlace = RenderPosition.AFTEREND;

export default class FilmController {
  constructor(container) {
    this._container = container;
    this._newCommentComponent = new NewCommentComponent();
    this._filmDetailsComponent = null;
    this._filmControlsComponent = null;
    this._modalContainer = modalContainer;
    this._modalPlace = modalPlace;
    this._filmCardComponent = null;
  }

  _removeFilmDetails() {
    remove(this._filmDetailsComponent);
  }

  _renderFilmDetails(film) {
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._filmControlsComponent = new FilmControlsComponent(film);
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

    const filmDetailsTopContainerElement = this._filmDetailsComponent.getElement().querySelector(`.form-details__top-container`);
    const filmDetailsCommentsElement = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
    const filmDetailsCommentsListElement = filmDetailsCommentsElement.querySelector(`.film-details__comments-list`);

    render(filmDetailsTopContainerElement, this._filmControlsComponent, RenderPosition.BEFOREEND);
    render(filmDetailsCommentsElement, this._newCommentComponent);
    film.comments.forEach((comment) => render(filmDetailsCommentsListElement, new CommentComponent(comment)));

    render(this._modalContainer, this._filmDetailsComponent, this._modalPlace);
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);

    const showFilmDetails = () => {
      if (this._filmDetailsComponent !== null) {
        this._removeFilmDetails();
        this._renderFilmDetails(film);
      } else {
        this._renderFilmDetails(film);
      }
    };

    this._filmCardComponent.setOnTitleClickHandler(showFilmDetails);
    this._filmCardComponent.setOnPosterClickHandler(showFilmDetails);
    this._filmCardComponent.setOnCommentsClickHandler(showFilmDetails);
    render(this._container, this._filmCardComponent);
  }

}
