import NewComment from "../components/new-comments.js";
import {render} from "../utils/render.js";

import CommentsContainerComponent from "../components/comments-container.js";
import CommentsWrapperComponent from "../components/comments-wrapper.js";
import CommentsTitleComponent from "../components/comments-title.js";
import CommentsListComponent from "../components/comments-list.js";

export default class CommentsController {
  constructor(container, commentsModel) {
    this._comments = null;
    this._commentsModel = commentsModel;
    this._container = container;
    this._commentsContainerComponent = new CommentsContainerComponent();
    this._commentsWrapperComponent = new CommentsWrapperComponent();
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  render(comments) {
    this._comments = comments.map((id) => this._commentsModel.getCommentById(id));

    const commentsListComponent = new CommentsListComponent(this._comments);
    commentsListComponent.setOnCommentClickHandler(this._onDeleteButtonClick);

    render(this._container, this._commentsContainerComponent);
    render(this._commentsContainerComponent.getElement(), this._commentsWrapperComponent);
    render(this._commentsWrapperComponent.getElement(), new CommentsTitleComponent(this._comments));
    render(this._commentsWrapperComponent.getElement(), commentsListComponent);
    render(this._commentsWrapperComponent.getElement(), new NewComment(this._comments));
  }

  updateComments(comments) {
    this._comments = comments;
  }

  deleteComment() {}

  addComment() {}

  _onDeleteButtonClick(buttonId) {
    const index = this._comments.findIndex((comment) => comment.id === buttonId);
  }
}
