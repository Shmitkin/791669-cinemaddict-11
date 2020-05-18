import HeaderProfileComponent from "../components/header-profile.js";
import {render, replace} from "../utils/render.js";

export default class HeaderProfileController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._headerProfileComponent = null;

    this._update = this._update.bind(this);
    this._filmsModel.addDataChangeHandler(this._update);
  }

  render() {
    this._headerProfileComponent = new HeaderProfileComponent(this._filmsModel.getData(`profile-rating`));
    render(this._container, this._headerProfileComponent);
  }

  _update() {
    const oldHeaderProfileComponent = this._headerProfileComponent;
    this._headerProfileComponent = new HeaderProfileComponent(this._filmsModel.getData(`profile-rating`));
    replace(this._headerProfileComponent, oldHeaderProfileComponent);
  }
}
