import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { Category } from '../categories/entities/category';
import { BlogPostsService } from './blogposts.service';
import { BlogPost } from './entities/blogpost';
import { Comment } from './entities/comment';
import { User } from '../users/entities/user';


describe('BlogPostsService', () => {
  let service: BlogPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPostsService, 
        { provide: getRepositoryToken(BlogPost), useValue: {} },
        { provide: getRepositoryToken(Category), useValue: {} },
        { provide: getRepositoryToken(Comment), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    service = module.get<BlogPostsService>(BlogPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
