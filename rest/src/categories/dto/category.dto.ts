import { Category } from '../entities/category';

export class CategoryDto {
  id?: number;
  name?: string;

  constructor(category: Category) {
    this.name = category.name;
    this.id = category.id;
  }
}
