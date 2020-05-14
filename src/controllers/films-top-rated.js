import AbstractFilmsController from "./abstract-films-controller.js";
import {CardCount} from "../consts.js";
import {getSortedArrayByKey} from "../utils/common.js";

export default class TopRatedController extends AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, api) {
    super(container, modalContainer, filmsModel, api);
  }

  render() {
    super.render();
    const topRatedFilms = this._filmsModel.getFilmsTopRated();
    this._renderFilms(topRatedFilms);
  }
}
