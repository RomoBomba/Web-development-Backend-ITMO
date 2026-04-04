import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesApiController } from './categories-api.controller';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import {CategoriesResolver} from "../graphql/categories.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    controllers: [CategoriesController, CategoriesApiController],
    providers: [CategoriesService, CategoriesResolver],
    exports: [CategoriesService],
})
export class CategoriesModule {}