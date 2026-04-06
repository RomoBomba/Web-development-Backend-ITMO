import { Repository } from 'typeorm';
import { Cache } from '@nestjs/cache-manager';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class ProductsService {
    private productRepository;
    private categoryRepository;
    private cacheManager;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>, cacheManager: Cache);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<Product>;
    getPopularProducts(): Promise<{}>;
    getRecommendedProducts(): Promise<Product[]>;
    findAllPaginated(paginationDto: PaginationDto): Promise<{
        data: Product[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        links: {
            self: string;
            first: string;
            previous: string | null;
            next: string | null;
            last: string;
        };
    }>;
    findByCategory(categoryId: number): Promise<{
        data: Product[];
        meta: {
            categoryId: number;
            total: number;
        };
    }>;
    findAllPaginatedGraphQL(paginationDto: PaginationDto): Promise<{
        items: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
}
