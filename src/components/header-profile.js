import AbstractComponent from "./abstract-component.js";

const RATING_TITLES = [
  {rating: 21, title: `movie buff`},
  {rating: 11, title: `fan`},
  {rating: 1, title: `novice`},
  {rating: 0, title: ``},
];

export default class HeaderProfile extends AbstractComponent {
  constructor(filmsInHistory) {
    super();
    this._filmsInHistory = filmsInHistory;
  }
  getTemplate() {
    return this._createTemplate();
  }

  _createTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._getProfileRatingTitle()}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }

  _getProfileRatingTitle() {
    return RATING_TITLES.find(({rating}) => this._filmsInHistory >= rating).title;
  }
}

