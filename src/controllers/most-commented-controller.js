import AbstractFilmsController from "./abstract-films-controller.js";
import {CardCount} from "../consts.js";

export default class MostCommentedController extends AbstractFilmsController {
  constructor(container, modalContainer, filmsModel, commentsModel) {
    super(container, modalContainer, filmsModel, commentsModel);
  }

  render() {
    super.render();
    this._renderFilms(this._getMostCommentedFilms());
  }

  _getMostCommentedFilms() {
    return this._filmsModel.getFilmsAll().slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, CardCount.MOST_COMMENTED);
  }
}
