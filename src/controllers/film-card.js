import FilmCardComponent from "../components/film-card.js";
import FilmDetailsController from "./film-details.js";
import {removeElement, render, RenderPosition} from "../utils/render.js";

const siteFooterElement = document.querySelector(`.footer`);

export default class FilmCardController {
  constructor(film) {
    this._film = film;
    this._filmDetailsController = new FilmDetailsController(this._film);
    this._filmCardComponent = new FilmCardComponent(this._film);
  }

  render(container, place = RenderPosition.BEFOREEND) {

    const showFilmDetails = () => {
      const anotherFilmDetailsElement = document.querySelector(`.film-details`);
      if (anotherFilmDetailsElement !== null) {
        removeElement(anotherFilmDetailsElement);
        this._filmDetailsController.render(siteFooterElement, RenderPosition.AFTEREND);
      } else {
        this._filmDetailsController.render(siteFooterElement, RenderPosition.AFTEREND);
      }
    };

    this._filmCardComponent.setOnTitleClickHandler(showFilmDetails);
    this._filmCardComponent.setOnPosterClickHandler(showFilmDetails);
    this._filmCardComponent.setOnCommentsClickHandler(showFilmDetails);

    render(container, this._filmCardComponent, place);
  }
}
