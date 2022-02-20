import { IDatabaseDriver, Options } from '@mikro-orm/core';
import { Category } from './src/categories/entities/category';
import { BlogPost } from './src/posts/entities/blogpost';
import { Comment } from './src/posts/entities/comment';
import { User } from './src/users/entities/user';

export default {
  entities: [BlogPost, Category, Comment, User],
  dbName: (process.env.seed ? './dist/' : '') + process.env.dbName,
  type: 'sqlite',
  migrations: {
    path: './migrations',
    pattern: /^[\w-]+\d+\.(ts|js)$/,
  },
} as Options<IDatabaseDriver>;
