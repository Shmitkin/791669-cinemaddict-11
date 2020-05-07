import NewComment from "../components/comment-new.js";
import {render, replace} from "../utils/render.js";

import CommentsContainerComponent from "../components/comments-container.js";
import CommentsWrapperComponent from "../components/comments-wrapper.js";
import CommentsTitleComponent from "../components/comments-title.js";
import CommentsListComponent from "../components/comments-list.js";

const KEY_CODES = [91, 13];

export default class CommentsController {
  constructor(container, commentsModel, onCommentsDataChange) {
    this._container = container;
    this._onCommentsDataChange = onCommentsDataChange;
    this._commentsModel = commentsModel;

    this._commentsContainerComponent = new CommentsContainerComponent();
    this._commentsWrapperComponent = new CommentsWrapperComponent();
    this._newCommentComponent = new NewComment();

    this._comments = null;
    this._commentsListComponent = null;
    this._commentsTitleComponent = null;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onNewCommentSubmit = this._onNewCommentSubmit.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);

    this._pressedKeys = new Set();
  }

  render(comments) {
    this._comments = comments;

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
    const newComment = this._newCommentComponent.getNewCommentData();
    const newCommentId = this._commentsModel.addComment(newComment);
    const newData = this._comments.map((comment) => comment.id);
    newData.push(newCommentId);

    this._onCommentsDataChange(newData);

    const oldNewCommentComponent = this._newCommentComponent;
    this._newCommentComponent = new NewComment();
    replace(this._newCommentComponent, oldNewCommentComponent);
  }

  updateComments(comments) {
    this._comments = comments;

    const oldCommentsTitleComponent = this._commentsTitleComponent;
    const oldCommentsListComponent = this._commentsListComponent;

    this._commentsListComponent = new CommentsListComponent(this._comments);
    this._commentsTitleComponent = new CommentsTitleComponent(this._comments);

    this._commentsListComponent.setOnCommentClickHandler(this._onDeleteButtonClick);

    replace(this._commentsListComponent, oldCommentsListComponent);
    replace(this._commentsTitleComponent, oldCommentsTitleComponent);
  }

  _onDeleteButtonClick(commentId) {
    this._onCommentsDataChange(commentId);
  }
}
