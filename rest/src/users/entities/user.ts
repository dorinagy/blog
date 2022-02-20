import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Comment } from '../../posts/entities/comment';
import { BlogPost } from '../../posts/entities/blogpost';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  userName!: string;

  @Property()
  password!: string;

  @Enum()
  role: UserRole;

  @OneToMany(() => BlogPost, post => post.user)
  posts = new Collection<BlogPost>(this);

  @OneToMany(() => Comment, comment => comment.user)
  comments = new Collection<Comment>(this);
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}
