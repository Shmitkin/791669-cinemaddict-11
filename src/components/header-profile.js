import AbstractComponent from "./abstract-component.js";
import {getRatingTitle} from "../utils/common.js";

export default class HeaderProfile extends AbstractComponent {
  constructor(profileRating) {
    super();
    this._profileRating = profileRating;
  }
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${getRatingTitle(this._profileRating)}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}

