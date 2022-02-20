import { UserDto } from "../../users/dto/user.dto";
import { User } from "../../users/entities/user";
import { Comment } from "../entities/comment";

export class CommentDto {
    id?: number;
    text?: string;
    createdAt?: Date;
    modifiedAt?: Date;
    user?: UserDto;
  
    constructor(comment: Comment) {
      this.id = comment.id;
      this.text = comment.text;
      this.createdAt = comment.createdAt;
      this.modifiedAt = comment.updatedAt;

      if (comment.user && comment.user instanceof User) {
        this.user = new UserDto(comment.user);
      }
    }
}
