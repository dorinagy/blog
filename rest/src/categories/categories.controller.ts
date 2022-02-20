import { UniqueConstraintViolationException } from '@mikro-orm/core';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CategoryDto) {
    try {
      const newCategory = await this.categoriesService.create(createCategoryDto);
      return new CategoryDto(newCategory);
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new HttpException('Category exists', HttpStatus.CONFLICT);
      } else {
        throw e;
      }
    }
  }

  @Get()
  async findAll(@Query() categoryDto: CategoryDto) {
    const categories = await this.categoriesService.findAll(categoryDto);
    return categories.map((category) => new CategoryDto(category));
  }
}
