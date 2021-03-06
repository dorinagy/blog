import { UserDto } from "../../users/dto/user.dto";
import { User } from "../../users/entities/user";
import { CategoryDto } from "../../categories/dto/category.dto";
import { BlogPost } from "../entities/blogpost";
import { CommentDto } from "./comment.dto";


export class BlogPostDto {
    id?: number;
    title?: string;
    text?: string;
    createdAt?: Date;
    updatedAt?: Date;
    comments?: CommentDto[];
    categories?: CategoryDto[];
    user?: UserDto;

    constructor(post: BlogPost) {
        this.id = post.id;
        this.title = post.title;
        this.text = post.text;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;

        if (post.comments.isInitialized(true)) {
            this.comments = post.comments
                .getItems()
                .map((comment) => new CommentDto(comment));
        }

        if (post.categories.isInitialized(true)) {
            this.categories = post.categories.getItems()
                .map((label) => new CategoryDto(label));
        }

        if (post.user && post.user instanceof User) {
            this.user = new UserDto(post.user);
          }
    }
}
  