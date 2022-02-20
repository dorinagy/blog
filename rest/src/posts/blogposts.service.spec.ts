import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Category } from 'src/categories/entities/category';
import { BlogPostsService } from './blogposts.service';
import { BlogPost } from './entities/blogpost';


describe('BlogPostsService', () => {
  let service: BlogPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPostsService, 
        { provide: getRepositoryToken(BlogPost), useValue: {} },
        { provide: getRepositoryToken(Category), useValue: {} },
      ],
    }).compile();

    service = module.get<BlogPostsService>(BlogPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
