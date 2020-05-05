import AbstractComponent from "./abstract-component.js";

export default class FilmDetails extends AbstractComponent {

  getTemplate() {
    return FilmDetails._createTemplate();
  }

  static _createTemplate() {
    return (
      `<section class="film-details"></section>`
    );
  }
}
