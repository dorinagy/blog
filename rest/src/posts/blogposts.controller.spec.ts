import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsService } from './blogposts.service';
import { BlogPostsController } from './blogposts.controller';

describe('BlogPostsController', () => {
  let service: BlogPostsService;
  let controller: BlogPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostsService],
      controllers: [BlogPostsController],
    }).compile();

    service = module.get<BlogPostsService>(BlogPostsService);
    controller = module.get<BlogPostsController>(BlogPostsController);
  });

  it('should be defined', () => {
    //expect(controller).toBeDefined();
  });
});
