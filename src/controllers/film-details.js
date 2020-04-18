import FilmDetailsComponent from "../components/film-details.js";
import FilmInfoComponent from "../components/film-info.js";
import FilmControlsComponent from "../components/film-controls.js";
import CommentComponent from "../components/comment.js";
import NewCommentComponent from "../components/new-comment.js";

import {isEscKey} from "../utils/common.js";
import {render, remove} from "../utils/render.js";

export default class FilmDetailsController {
  constructor(film) {
    this._film = film;
    this._filmDetailsComponent = new FilmDetailsComponent(this._film);
    this._filmInfoComponent = new FilmInfoComponent(this._film);
    this._filmControlsComponent = new FilmControlsComponent(this._film);
    this._newCommentComponent = new NewCommentComponent();
  }

  removeFilmDetailsComponent() {
    remove(this._filmDetailsComponent);
  }

  getFilmDetailsComponent() {
    const onCloseButtonClick = () => {
      this.removeFilmDetailsComponent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (isEscKey(evt)) {
        this.removeFilmDetailsComponent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmDetailsComponent.setOnCloseButtonClickHandler(onCloseButtonClick);
    document.addEventListener(`keydown`, onEscKeyDown);

    const filmDetailsTopContainerElement = this._filmDetailsComponent.getElement().querySelector(`.form-details__top-container`);
    const filmDetailsCommentsElement = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`);
    const filmDetailsCommentsListElement = filmDetailsCommentsElement.querySelector(`.film-details__comments-list`);

    render(filmDetailsTopContainerElement, this._filmInfoComponent);
    render(filmDetailsTopContainerElement, this._filmControlsComponent);
    render(filmDetailsCommentsElement, this._newCommentComponent);
    this._film.comments.forEach((comment) => render(filmDetailsCommentsListElement, new CommentComponent(comment)));

    return this._filmDetailsComponent;
  }

  render(container, place) {
    render(container, this.getFilmDetailsComponent(), place);
  }
}
