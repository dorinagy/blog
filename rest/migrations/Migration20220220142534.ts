import { Migration } from '@mikro-orm/migrations';

export class Migration20220220142534 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `name` varchar not null, `user_name` varchar not null, `password` varchar not null, `role` varchar not null);');
    this.addSql('create unique index `user_user_name_unique` on `user` (`user_name`);');

    this.addSql('create table `category` (`id` integer not null primary key autoincrement, `name` varchar not null);');
    this.addSql('create unique index `category_name_unique` on `category` (`name`);');

    this.addSql('create table `blog_post` (`id` integer not null primary key autoincrement, `title` varchar not null, `text` varchar not null, `created_at` datetime not null, `updated_at` datetime not null);');

    this.addSql('create table `comment` (`id` integer not null primary key autoincrement, `text` varchar not null, `created_at` datetime not null, `updated_at` datetime not null);');

    this.addSql('create table `category_blog_posts` (`category_id` integer not null, `blog_post_id` integer not null, primary key (`category_id`, `blog_post_id`));');
    this.addSql('create index `category_blog_posts_category_id_index` on `category_blog_posts` (`category_id`);');
    this.addSql('create index `category_blog_posts_blog_post_id_index` on `category_blog_posts` (`blog_post_id`);');

    this.addSql('alter table `comment` add column `blog_post_id` integer null;');
    this.addSql('alter table `comment` add column `user_id` integer null;');
    this.addSql('create index `comment_blog_post_id_index` on `comment` (`blog_post_id`);');
    this.addSql('create index `comment_user_id_index` on `comment` (`user_id`);');
  }

}
