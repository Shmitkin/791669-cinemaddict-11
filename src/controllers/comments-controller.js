import NewComment from "../components/new-comments.js";
import {render} from "../utils/render.js";

import CommentsContainerComponent from "../components/comments-container.js";
import CommentsWrapperComponent from "../components/comments-wrapper.js";
import CommentsTitleComponent from "../components/comments-title.js";
import CommentsListComponent from "../components/comments-list.js";

export default class CommentsController {
  constructor(container) {
    this._comments = null;
    this._container = container;
    this._commentsContainerComponent = new CommentsContainerComponent();
    this._commentsWrapperComponent = new CommentsWrapperComponent();
  }

  render(comments) {
    this._comments = comments;

    render(this._container, this._commentsContainerComponent);
    render(this._commentsContainerComponent.getElement(), this._commentsWrapperComponent);
    render(this._commentsWrapperComponent.getElement(), new CommentsTitleComponent(this._comments));
    render(this._commentsWrapperComponent.getElement(), new CommentsListComponent(this._comments));
    render(this._commentsWrapperComponent.getElement(), new NewComment(this._comments));


  }

  updateComments(comments) {
    this._comments = comments;

  }

  deleteComment() {

  }

  addComment() {

  }


}
