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

  /*describe('getIssues', () => {
    it('should create a get request to /api/issues', async () => {
      const getIssuesPromise = service.getIssues();

      httpTestingController.expectOne('/api/issues').flush([]);

      await expectAsync(getIssuesPromise).toBeResolved();

      httpTestingController.verify();
    });

    it('should return the result of the request', async () => {
      const getIssuesPromise = service.getIssues();

      httpTestingController.expectOne('/api/issues').flush([]);

      await expectAsync(getIssuesPromise).toBeResolvedTo([]);

      httpTestingController.verify();
    });
  });*/
});
