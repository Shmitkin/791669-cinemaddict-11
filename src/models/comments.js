//  mock
import {generateCommentId} from "../mock/comment";
import {getRandomArrayItem} from "../mock/utils.js";
import {COMMENT_AUTHORS} from "../mock/comment-data.js";
// /mock

export default class CommentsModel {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getCommentById(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);
    return this._comments[index];
  }

  getCommentsAll() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
  }

  deleteComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

  }

  addComment(comment) {
    // mock
    comment.id = generateCommentId();
    comment.author = getRandomArrayItem(COMMENT_AUTHORS);
    // /mock
    this._comments.push(comment);
    return comment.id;
  }

  addDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  static _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
