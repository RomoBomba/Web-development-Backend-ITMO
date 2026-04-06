import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsApiController } from './products-api.controller';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import {ProductsResolver} from "../graphql/products.resolver";
import {StorageModule} from "../storage/storage.module";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Category]),
        StorageModule,
        UsersModule,
    ],
    controllers: [ProductsController, ProductsApiController],
    providers: [ProductsService, ProductsResolver],
    exports: [ProductsService],
})
export class ProductsModule {}