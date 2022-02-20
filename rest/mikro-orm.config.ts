import { IDatabaseDriver, Options } from '@mikro-orm/core';
import { BlogPost } from './src/posts/entities/blogpost';
import { User } from './src/users/entities/user';

export default {
  entities: [BlogPost, User],
  dbName: (process.env.seed ? './dist/' : '') + process.env.dbName,
  type: 'sqlite',
  migrations: {
    path: './migrations',
    pattern: /^[\w-]+\d+\.(ts|js)$/,
  },
} as Options<IDatabaseDriver>;
