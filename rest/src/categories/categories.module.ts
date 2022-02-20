import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Category } from './entities/category';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Category] })],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
