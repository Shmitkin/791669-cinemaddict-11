import AbstractFilmsController from "./abstract-films-controller.js";

export default class TopRatedController extends AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, api) {
    super(container, modalContainer, filmsModel, api);
  }

  render(topRatedFilms) {
    super.render();
    this._renderFilms(topRatedFilms);
  }
}
