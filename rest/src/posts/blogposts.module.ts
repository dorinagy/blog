import { Module } from '@nestjs/common';
import { BlogPostsService } from './blogposts.service';
import { BlogPostsController } from './blogposts.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BlogPost } from './entities/blogpost';
import { Category } from '../categories/entities/category';
import { Comment } from '../posts/entities/comment';
import { User } from '../users/entities/user';

@Module({
  imports: [MikroOrmModule.forFeature({entities: [BlogPost, Category, User, Comment]})],
  providers: [BlogPostsService],
  controllers: [BlogPostsController]
})
export class BlogPostsModule {}
