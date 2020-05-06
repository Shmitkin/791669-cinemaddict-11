import NewComment from "../components/comment-new.js";
import {render, replace} from "../utils/render.js";

import CommentsContainerComponent from "../components/comments-container.js";
import CommentsWrapperComponent from "../components/comments-wrapper.js";
import CommentsTitleComponent from "../components/comments-title.js";
import CommentsListComponent from "../components/comments-list.js";

export default class CommentsController {
  constructor(container, commentsModel, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._commentsModel = commentsModel;

    this._commentsContainerComponent = new CommentsContainerComponent();
    this._commentsWrapperComponent = new CommentsWrapperComponent();
    this._newCommentComponent = new NewComment();

    this._comments = null;
    this._commentsListComponent = null;
    this._commentsTitleComponent = null;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onNewCommentSubmit = this._onNewCommentSubmit.bind(this);


    this._setSubmitNewCommentHandler(this._onNewCommentSubmit, 91, 13);
  }

  render(comments) {
    this._comments = comments.map((id) => this._commentsModel.getCommentById(id));

    this._commentsListComponent = new CommentsListComponent(this._comments);
    this._commentsTitleComponent = new CommentsTitleComponent(this._comments);

    this._commentsListComponent.setOnCommentClickHandler(this._onDeleteButtonClick);

    const commentsContainerElement = this._commentsContainerComponent.getElement();
    const commentsWrapperElemenr = this._commentsWrapperComponent.getElement();

    render(this._container, this._commentsContainerComponent);
    render(commentsContainerElement, this._commentsWrapperComponent);
    render(commentsWrapperElemenr, this._commentsTitleComponent);
    render(commentsWrapperElemenr, this._commentsListComponent);
    render(commentsWrapperElemenr, this._newCommentComponent);
  }


  _setSubmitNewCommentHandler(handler, ...keyCodes) {
    let pressed = new Set();

    document.addEventListener(`keydown`, function (evt) {
      pressed.add(evt.keyCode);

      for (let keyCode of keyCodes) {
        if (!pressed.has(keyCode)) {
          return;
        }
      }

      pressed.clear();

      handler();
    });

    document.addEventListener(`keyup`, function (evt) {
      pressed.delete(evt.keyCode);
    });
  }

  _onNewCommentSubmit() {
    const newComment = this._newCommentComponent.getNewCommentData();
    const newCommentId = this._commentsModel.addComment(newComment);
    const newData = this._comments.map((comment) => comment.id);
    newData.push(newCommentId);

    this._onDataChange(newData);

    const oldNewCommentComponent = this._newCommentComponent;
    this._newCommentComponent = new NewComment();
    replace(this._newCommentComponent, oldNewCommentComponent);
  }

  updateComments(comments) {
    this._comments = comments.map((id) => this._commentsModel.getCommentById(id));

    const oldCommentsTitleComponent = this._commentsTitleComponent;
    const oldCommentsListComponent = this._commentsListComponent;

    this._commentsListComponent = new CommentsListComponent(this._comments);
    this._commentsTitleComponent = new CommentsTitleComponent(this._comments);

    this._commentsListComponent.setOnCommentClickHandler(this._onDeleteButtonClick);

    replace(this._commentsListComponent, oldCommentsListComponent);
    replace(this._commentsTitleComponent, oldCommentsTitleComponent);
  }

  _onDeleteButtonClick(commentId) {
    const index = this._comments.findIndex((comment) => comment.id === commentId);

    const newComments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    const newData = newComments.map((comment) => comment.id);

    this._onDataChange(newData);
    this._commentsModel.deleteComment(commentId);
  }
}
