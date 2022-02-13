import { IDatabaseDriver, Options } from '@mikro-orm/core';
import { Label } from './src/labels/entities/label';
import { User } from './src/users/entities/user';

export default {
  entities: [Label, User],
  dbName: (process.env.seed ? './dist/' : '') + process.env.dbName,
  type: 'sqlite',
  migrations: {
    path: 'migrations',
    pattern: /^[\w-]+\d+\.(ts|js)$/,
  },
} as Options<IDatabaseDriver>;
