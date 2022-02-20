import { Comment } from "../entities/comment";

export class CommentDto {
    id?: number;
    text?: string;
    createdAt?: Date;
    modifiedAt?: Date;
  
    constructor(comment: Comment) {
      this.id = comment.id;
      this.text = comment.text;
      this.createdAt = comment.createdAt;
      this.modifiedAt = comment.updatedAt;
    }
}
  