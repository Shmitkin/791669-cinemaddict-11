import API from "./api.js";
import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films.js";
import CommentsModel from "./models/comments.js";

const AUTHORIZATION = `Basic dwef=f4echiudfn9`;


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const api = new API(AUTHORIZATION);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const pageController = new PageController(filmsModel, commentsModel, siteHeaderElement, siteMainElement, siteFooterElement, api);

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render();
  });
