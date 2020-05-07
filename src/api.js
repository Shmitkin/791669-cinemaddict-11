import Film from "./models/film.js";
import Comment from "./models/comment.js";

export default class API {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
    .then(API._checkStatus)
    .then((response) => response.json())
    .then(Film.parseFilms);
  }

  updateFilm(id, updatedFilmModel) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(updatedFilmModel.toRAW()),
      headers,
    })
      .then(API._checkStatus)
      .then((response) => response.json())
      .then(Film.parseFilm);
  }

  getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {headers})
    .then(API._checkStatus)
    .then((response) => response.json())
    .then(Comment.parseComments);
  }

  deleteComment(commentId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${commentId}`, {
      method: `DELETE`,
      headers,
    })
      .then(API._checkStatus);
  }

  static _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}

