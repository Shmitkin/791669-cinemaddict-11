import FilmsListComponent from "../components/films-list.js";
import FilmsListController from "./films-list";
import {render} from "../utils/render.js";
import TopRatedController from "./films-top-rated.js";
import MostCommentedController from "./films-most-commented.js";

export default class FilmsController {
  constructor(container, filmsModel, siteFooterElement, api) {
    this._filmsModel = filmsModel;
    this._api = api;


    this._container = container;
    this._siteFooterElement = siteFooterElement;

    this._sortComponent = null;
    this._filmsController = null;
    this._filmsListComponent = null;
    this._mostCommentedFilmsComponent = new FilmsListComponent({title: `Most commented`, isExtra: true});
    this._isMostCommentedFilmsHidden = false;

    this._update = this._update.bind(this);
    this._filmsModel.addDataChangeHandler(this._update);
  }

  render() {
    const films = this._filmsModel.getData(`films`);

    if (films.count === 0) {
      this._filmsListComponent = new FilmsListComponent({title: `There are no movies in our database`});
      render(this._container, this._filmsListComponent);
      return;
    }


    this._filmsListComponent = new FilmsListComponent({title: `All movies. Upcoming`, isHidden: true});
    this._filmsController = new FilmsListController(this._filmsListComponent.getElement(), this._siteFooterElement, this._filmsModel, this._api);
    render(this._container, this._filmsListComponent);
    this._filmsController.render();

    if (films.topRated.length !== 0) {
      const topRatedFilmsComponent = new FilmsListComponent({title: `Top rated`, isExtra: true});
      const topRatedFilmsController = new TopRatedController(topRatedFilmsComponent.getElement(), this._siteFooterElement, this._filmsModel, this._api);
      render(this._container, topRatedFilmsComponent);
      topRatedFilmsController.render(films.topRated);
    }

    const mostCommentedFilmsController = new MostCommentedController(this._mostCommentedFilmsComponent.getElement(), this._siteFooterElement, this._filmsModel, this._api);
    render(this._container, this._mostCommentedFilmsComponent);
    mostCommentedFilmsController.render();
  }

  _update() {
    if (this._filmsModel.getFilmsMostCommented().length === 0 && !this._isMostCommentedFilmsHidden) {
      this._mostCommentedFilmsComponent.hide();
      this._isMostCommentedFilmsHidden = true;
    } else if (this._filmsModel.getFilmsMostCommented().length !== 0 && this._isMostCommentedFilmsHidden) {
      this._mostCommentedFilmsComponent.show();
      this._isMostCommentedFilmsHidden = false;
    }
  }
}
