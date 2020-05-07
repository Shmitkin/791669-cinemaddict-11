export default class CommentModel {
  constructor(comment) {
    this.id = comment[`id`];
    this.emoji = comment[`emotion`];
    this.text = comment[`comment`];
    this.author = comment[`author`];
    this.date = comment[`date`];
  }

  toRAW() {
    return {

    };
  }

  static parseComment(comment) {
    return new CommentModel(comment);
  }

  static parseComments(comments) {
    return comments.map(CommentModel.parseComment);
  }

  static clone(comment) {
    return new CommentModel(comment.toRAW());
  }
}
