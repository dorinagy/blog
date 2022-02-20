import { Category } from '../entities/category';

export class CategoryDto {
  id?: number;
  text?: string;

  constructor(category: Category) {
    this.text = category.text;
    this.id = category.id;
  }
}
