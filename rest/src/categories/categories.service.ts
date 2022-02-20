import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category';

@Injectable()
export class CategoriesService {
  
  constructor(
    @InjectRepository(Category)
    private categoryRepository: EntityRepository<Category>,
  ) {}

  async create(createCategoryDto: CategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.persistAndFlush(category);
    return category;
  }

  async findAll(categoryDto: CategoryDto) {
    return await this.categoryRepository.find({
      name: { $like: `%${categoryDto.name || ''}%` },
    });
  }
}
