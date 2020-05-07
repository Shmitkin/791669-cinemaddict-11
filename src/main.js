import API from "./api.js";
import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films.js";
import CommentsModel from "./models/comments.js";

import {generateFilms} from "./mock/film.js";
import {generateComments} from "./mock/comment.js";

import {CardCount} from "./consts.js";

const AUTHORIZATION = `Basic dwef=f4echiudfn9`;


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const api = new API(AUTHORIZATION);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const pageController = new PageController(filmsModel, commentsModel, siteHeaderElement, siteMainElement, siteFooterElement);

// const films = generateFilms(CardCount.SUMMARY);
// const commentsCount = films.reduce((commentsId, film) => commentsId.concat(film.comments), []);
// const comments = generateComments(commentsCount);

// commentsModel.setComments(comments);

api.getFilms()
  .then((films) => {
    console.log(films);
    filmsModel.setFilms(films);
    pageController.render();
  });
