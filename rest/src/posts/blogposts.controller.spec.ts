import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsService } from './blogposts.service';
import { BlogPostsController } from './blogposts.controller';

describe('BlogPostsController', () => {
  let controller: BlogPostsController;
  let blogPostsService: any;

  beforeEach(async () => {
    blogPostsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostsController],
      providers: [{ provide: BlogPostsService, useValue: blogPostsService }],
    }).compile();

    controller = module.get<BlogPostsController>(BlogPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should give empty array when no BlogPosts have been created', () => {
    blogPostsService.findAll.mockReturnValue([]);
    expect(controller.findAll({})).resolves.toEqual([]);
  });

  it('should throw an error when the requested issue is missing', () => {
    blogPostsService.findOne.mockReturnValue(undefined);
    expect(controller.findOne(1)).rejects.toThrow();
  });
});
