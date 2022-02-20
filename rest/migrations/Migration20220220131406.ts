import { Migration } from '@mikro-orm/migrations';

export class Migration20220220131406 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `name` varchar not null, `user_name` varchar not null, `password` varchar not null, `role` varchar not null);');
    this.addSql('create unique index `user_user_name_unique` on `user` (`user_name`);');

    this.addSql('create table `blog_post` (`id` integer not null primary key autoincrement, `title` varchar not null);');
  }

}
