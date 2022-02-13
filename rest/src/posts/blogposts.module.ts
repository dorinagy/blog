import { Module } from '@nestjs/common';
import { BlogPostsService } from './blogposts.service';
import { BlogPostsController } from './blogposts.controller';

@Module({
  providers: [BlogPostsService],
  controllers: [BlogPostsController]
})
export class BlogPostsModule {}
