import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from '@nestjs/cache-manager';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import {CACHE_MANAGER} from "@nestjs/cache-manager";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async create(createProductDto: CreateProductDto) {
        const category = await this.categoryRepository.findOne({
            where: { id: createProductDto.categoryId },
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const product = this.productRepository.create({
            ...createProductDto,
            category,
        });

        return await this.productRepository.save(product);
    }

    async findAll() {
        return await this.productRepository.find({
            relations: ['category'],
        });
    }

    async findOne(id: number) {
        if (isNaN(id) || id <= 0) {
            throw new NotFoundException(`Некорректный ID товара: ${id}`);
        }

        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category'],
        });

        if (!product) {
            throw new NotFoundException(`Товар #${id} не найден`);
        }

        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);

        if (updateProductDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: updateProductDto.categoryId },
            });
            if (!category) {
                throw new NotFoundException('Category not found');
            }
            product.category = category;
        }

        Object.assign(product, updateProductDto);
        return await this.productRepository.save(product);
    }

    async remove(id: number) {
        const product = await this.findOne(id);
        await this.productRepository.delete(id);
        return product;
    }

    async getPopularProducts() {
        const cached = await this.cacheManager.get('popular_products');
        if (cached) {
            console.log('✅ Возвращаем из кэша popular_products');
            return cached;
        }

        const products = await this.productRepository.find({
            take: 3,
            order: { createdAt: 'DESC' },
        });

        await this.cacheManager.set('popular_products', products);
        console.log('💾 Сохранили popular_products в кэш');

        return products;
    }

    async getRecommendedProducts() {
        const allProducts = await this.productRepository.find({
            relations: ['category'],
        });

        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        const recommended = shuffled.slice(0, 3);

        if (recommended.length < 3 && allProducts.length > 0) {
            while (recommended.length < 3) {
                recommended.push(allProducts[0]);
            }
        }

        return recommended;
    }

    async findAllPaginated(paginationDto: PaginationDto) {
        const page = paginationDto.page ?? 1;
        const limit = paginationDto.limit ?? 10;
        const skip = (page - 1) * limit;

        const [data, total] = await this.productRepository.findAndCount({
            relations: ['category'],
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
            links: {
                self: `/api/products?page=${page}&limit=${limit}`,
                first: `/api/products?page=1&limit=${limit}`,
                previous: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `/api/products?page=${page + 1}&limit=${limit}` : null,
                last: `/api/products?page=${totalPages}&limit=${limit}`,
            },
        };
    }

    async findByCategory(categoryId: number) {
        const products = await this.productRepository.find({
            where: { categoryId },
            relations: ['category'],
            order: { createdAt: 'DESC' },
        });

        if (!products.length) {
            return {
                data: [],
                meta: {
                    categoryId,
                    total: 0,
                },
            };
        }

        return {
            data: products,
            meta: {
                categoryId,
                total: products.length,
            },
        };
    }

    async findAllPaginatedGraphQL(paginationDto: PaginationDto) {
        const page = paginationDto.page ?? 1;
        const limit = paginationDto.limit ?? 10;
        const skip = (page - 1) * limit;

        const [items, total] = await this.productRepository.findAndCount({
            relations: ['category'],
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        const totalPages = Math.ceil(total / limit);

        return {
            items,
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
    }
}