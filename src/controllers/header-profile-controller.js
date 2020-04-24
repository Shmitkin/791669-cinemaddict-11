import HeaderProfileComponent from "../components/header-profile.js";
import {render} from "../utils/render.js";

export default class HeaderProfileController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
  }

  render() {
    const headerProfileComponent = new HeaderProfileComponent(this._getProfileRating());
    render(this._container, headerProfileComponent);

  }
  _getProfileRating() {
    return this._films.reduce((rating, film) => {
      if (film.isMarkedAsWatched) {
        rating++;
      } return rating;
    }, 0);
  }

}
