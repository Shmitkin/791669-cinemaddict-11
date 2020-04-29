import HeaderProfileComponent from "../components/header-profile.js";
import {render} from "../utils/render.js";

export default class HeaderProfileController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
  }

  render() {
    const headerProfileComponent = new HeaderProfileComponent(this._getProfileRating());
    render(this._container, headerProfileComponent);

  }

  _getProfileRating() {
    return this._filmsModel.getFilmsAll().reduce((rating, {isMarkedAsWatched}) => isMarkedAsWatched ? rating + 1 : rating, 0);
  }
}
