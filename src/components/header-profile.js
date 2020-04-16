import {createElement} from "../utils.js";

const RATING_TITLES = [
  {rating: 21, title: `movie buff`},
  {rating: 11, title: `fan`},
  {rating: 1, title: `novice`},
  {rating: 0, title: ``},
];

const getRatingTitle = (value) => RATING_TITLES.find(({rating}) => value >= rating).title;

const createHeaderProfileTemplate = (filmsInHistory) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getRatingTitle(filmsInHistory)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


export default class HeaderProfile {
  constructor(filmsInHistory) {
    this._filmsInHistory = filmsInHistory;
    this._element = null;
  }
  getTemplate() {
    return createHeaderProfileTemplate(this._filmsInHistory);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

