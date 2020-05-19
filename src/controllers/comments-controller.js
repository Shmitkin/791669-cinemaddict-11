import NewComment from "../components/comment-new.js";
import {render, replace} from "../utils/render.js";
import CommentModel from "../models/comment.js";
import CommentsModel from "../models/comments.js";

import CommentsContainerComponent from "../components/comments-container.js";
import CommentsWrapperComponent from "../components/comments-wrapper.js";
import CommentsTitleComponent from "../components/comments-title.js";
import CommentsListComponent from "../components/comments-list.js";

const KEY_CODES = [91, 13];
const SHAKE_ANIMATION_TIMEOUT = 600;

export default class CommentsController {
  constructor(container, onCommentsDataChange, api, filmId) {
    this._container = container;
    this._onCommentsDataChange = onCommentsDataChange;
    this._api = api;
    this._filmId = filmId;

    this._commentsContainerComponent = new CommentsContainerComponent();
    this._commentsWrapperComponent = new CommentsWrapperComponent();
    this._newCommentComponent = new NewComment();
    this._commentsModel = new CommentsModel();

    this._comments = null;
    this._commentsListComponent = null;
    this._commentsTitleComponent = null;
    this._filmCommentsList = null;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onNewCommentSubmit = this._onNewCommentSubmit.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._updateComments = this._updateComments.bind(this);

    this._commentsModel.addDataChangeHandler(this._updateComments);

    this._pressedKeys = new Set();
  }

  render(filmCommentsList) {
    this._filmCommentsList = filmCommentsList;

    this._api.getComments(this._filmId)
    .then((comments) => {
      this._commentsModel.setComments(comments);
    });

    this._commentsListComponent = new CommentsListComponent({status: `loading`});
    this._commentsTitleComponent = new CommentsTitleComponent(filmCommentsList.length);

    this._commentsListComponent.setOnCommentClickHandler(this._onDeleteButtonClick);

    const commentsContainerElement = this._commentsContainerComponent.getElement();
    const commentsWrapperElement = this._commentsWrapperComponent.getElement();

    render(this._container, this._commentsContainerComponent);
    render(commentsContainerElement, this._commentsWrapperComponent);
    render(commentsWrapperElement, this._commentsTitleComponent);
    render(commentsWrapperElement, this._commentsListComponent);
    render(commentsWrapperElement, this._newCommentComponent);

    document.addEventListener(`keydown`, this._onKeyDown);
    document.addEventListener(`keyup`, this._onKeyUp);
  }

  removeListeners() {
    document.removeEventListener(`keydown`, this._onKeyDown);
    document.removeEventListener(`keyup`, this._onKeyUp);
  }

  _onKeyDown(evt) {
    this._pressedKeys.add(evt.keyCode);

    for (let keyCode of KEY_CODES) {
      if (!this._pressedKeys.has(keyCode)) {
        return;
      }
    }

    this._pressedKeys.clear();
    this._onNewCommentSubmit();
  }

  _onKeyUp(evt) {
    this._pressedKeys.delete(evt.keyCode);
  }

  _onNewCommentSubmit() {
    const oldNewCommentComponent = this._newCommentComponent;
    const userComment = this._newCommentComponent.getNewCommentData();
    const newComment = CommentModel.parseUserComment(userComment);
    this._newCommentComponent.setViewMode(`disabled`);

    this._api.addComment(this._filmId, newComment)
    .then((response) => response.json())
    .then((newData) => {
      this._commentsModel.setComments(CommentModel.parseComments(newData.comments));
      this._onCommentsDataChange({type: `adding-comment`, data: newData.movie});
      this._newCommentComponent = new NewComment();
      replace(this._newCommentComponent, oldNewCommentComponent);
    })
    .catch(() => {
      CommentsController._shake(this._newCommentComponent.getElement());
      this._newCommentComponent.setViewMode(`error`);
    });
  }

  _updateComments() {
    this._comments = this._commentsModel.getCommentsAll();

    const oldCommentsTitleComponent = this._commentsTitleComponent;
    const oldCommentsListComponent = this._commentsListComponent;

    this._commentsListComponent = new CommentsListComponent({status: `loaded`, comments: this._comments});
    this._commentsTitleComponent = new CommentsTitleComponent(this._comments.length);

    this._commentsListComponent.setOnCommentClickHandler(this._onDeleteButtonClick);

    replace(this._commentsListComponent, oldCommentsListComponent);
    replace(this._commentsTitleComponent, oldCommentsTitleComponent);
  }

  _onDeleteButtonClick(commentId) {
    const buttonElement = document.getElementById(`${commentId}`);
    const commentElement = buttonElement.closest(`.film-details__comment`);

    buttonElement.innerText = `Deleting...`;
    buttonElement.disabled = true;

    this._api.deleteComment(commentId)
    .then(() => {
      const index = this._comments.findIndex((comment) => comment.id === commentId);
      this._comments.splice(index, 1);
      this._filmCommentsList.splice(index, 1);
      this._updateComments();
      this._onCommentsDataChange({type: `deleting-comment`, data: this._filmCommentsList});
    })
    .catch(() => {
      buttonElement.innerText = `Delete`;
      buttonElement.disabled = false;
      CommentsController._shake(commentElement);
    });
  }

  static _shake(container) {
    container.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      container.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
