import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  async getCategories(): Promise<Category[]> {
    return (
      this.httpClient.get('/api/categories') as Observable<Category[]>
    ).toPromise();
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return (
      this.httpClient.get(`/api/categories/${id}`) as Observable<Category>
    ).toPromise();
  }
}
