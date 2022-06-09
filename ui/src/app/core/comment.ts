import { User } from "./user";

export interface Comment {
  id?: number;
  text?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  user?: User;
}