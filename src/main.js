import PageController from "./controllers/page-controller.js";
import FilmsModel from "./models/films.js";
import CommentsModel from "./models/comments.js";

import {generateFilms} from "./mock/film.js";
import {generateComments} from "./mock/comment.js";

import {CardCount} from "./consts.js";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const films = generateFilms(CardCount.SUMMARY);
const commentsCount = films.reduce((commentsId, film) => commentsId.concat(film.comments), []);
const comments = generateComments(commentsCount);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

filmsModel.setFilms(films);
commentsModel.setComments(comments);

const pageController = new PageController(filmsModel, commentsModel, siteHeaderElement, siteMainElement, siteFooterElement);

pageController.render();
