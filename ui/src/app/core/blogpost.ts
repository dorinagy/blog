import { Comment } from "./comment";
import { Category } from "./category";
import { User } from "./user";

export interface BlogPost {
  id?: number;
  title: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: Comment[];
  categories?: Category[];
  user?: User;
}
