import { Module } from '@nestjs/common';
import { BlogPostsService } from './blogposts.service';
import { BlogPostsController } from './blogposts.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BlogPost } from './entities/blogpost';

@Module({
  imports: [MikroOrmModule.forFeature({entities: [BlogPost]})],
  providers: [BlogPostsService],
  controllers: [BlogPostsController]
})
export class BlogPostsModule {}
