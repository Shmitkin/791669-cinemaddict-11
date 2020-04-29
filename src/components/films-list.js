import AbstractComponent from "./abstract-component.js";
import {addProperty} from "../utils/common.js";

const HIDDEN_CLASS = `visually-hidden`;
const EXTRA_CLASS = `--extra`;

export default class FilmsList extends AbstractComponent {
  constructor({title, isExtra = false, isHidden = false}) {
    super();
    this._title = title;
    this._isExtra = isExtra;
    this._isHidden = isHidden;
  }
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<section class="films-list${addProperty(this._isExtra, EXTRA_CLASS)}">
        <h2 class="films-list__title ${addProperty(this._isHidden, HIDDEN_CLASS)}">${this._title}</h2>
        <div class="films-list__container">
        </div>
      </section>`
    );
  }
}
