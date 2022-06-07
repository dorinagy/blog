import { User } from "./user";

export interface Comment {
  id?: number;
  createdAt?: Date;
  modifiedAt?: Date;
  user?: User;
}