import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BlogPostService } from './blogpost.service';

describe('BlogPostService', () => {
  let service: BlogPostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BlogPostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBlogPosts', () => {
    it('should create a get request to /api/blogposts', async () => {
      const getBlogPostPromise = service.getBlogPosts();

      httpTestingController.expectOne('/api/blogposts').flush([]);

      await expectAsync(getBlogPostPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const getBlogPostPromise = service.getBlogPosts();

      httpTestingController.expectOne('/api/blogposts').flush([]);

      await expectAsync(getBlogPostPromise).toBeResolvedTo([]);

      httpTestingController.verify();
    });
  });
});
