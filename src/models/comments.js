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

    if (index === -1) {
      return;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
  }

  addDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  static _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
