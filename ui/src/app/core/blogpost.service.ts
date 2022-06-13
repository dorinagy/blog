import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './blogpost';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private httpClient: HttpClient) {}

  async getBlogPosts(): Promise<BlogPost[]> {
    return (
      this.httpClient.get('/api/blogposts') as Observable<BlogPost[]>
    ).toPromise();
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return (
      this.httpClient.get(`/api/blogposts/${id}`) as Observable<BlogPost>
    ).toPromise();
  }

  async createBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    const createdBlogPost = await (
      this.httpClient.post('/api/blogposts', blogPost) as Observable<BlogPost>
    ).toPromise();
    return createdBlogPost;
  }

  async removeBlogPost(id: number) {
    await (
      this.httpClient.delete(
        `/api/blogposts/${id}`,
        {}
      )
    ).toPromise();
  }

  async deleteComment(id: number, commentId: number) {
    await (
      this.httpClient.delete(
        `/api/blogposts/${id}/comments/${commentId}`,
        {}
      )
    ).toPromise();
  }

  async editBlogPost(id: number, blogPost: BlogPost): Promise<BlogPost> {
    const modifiedBlogPost = await (
      this.httpClient.patch(
        `/api/blogposts/${id}`,
        blogPost
      ) as Observable<BlogPost>
    ).toPromise();
    return modifiedBlogPost;
  }

  async addComment(blogPost: BlogPost, comment: string): Promise<Comment> {
    const createdComment = await this.httpClient
      .post<Comment>(`/api/blogposts/${blogPost.id}/comments`, { text: comment })
      .toPromise();
    return createdComment;
  }
}
