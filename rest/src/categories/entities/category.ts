import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BlogPost } from '../../posts/entities/blogpost';

@Entity()
export class Category {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @ManyToMany(() => BlogPost)
  blogPosts = new Collection<BlogPost>(this);
}
