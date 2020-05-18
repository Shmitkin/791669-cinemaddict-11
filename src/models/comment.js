export default class CommentModel {
  constructor(comment) {
    this.id = comment[`id`];
    this.emoji = comment[`emotion`];
    this.text = comment[`comment`];
    this.author = comment[`author`];
    this.date = comment[`date`];
  }

  static parseUserComment(comment) {
    return {
      "comment": comment.text,
      "date": comment.date,
      "emotion": comment.emoji
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
