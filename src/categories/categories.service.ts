import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../products/dto/pagination.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async findAll() {
        return await this.categoryRepository.find({
            relations: ['products'],
        });
    }

    async findAllPaginated(paginationDto: PaginationDto) {
        const page = paginationDto.page ?? 1;
        const limit = paginationDto.limit ?? 10;
        const skip = (page - 1) * limit;

        const [data, total] = await this.categoryRepository.findAndCount({
            skip,
            take: limit,
            order: { name: 'ASC' },
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: { page, limit, total, totalPages },
            links: {
                self: `/api/categories?page=${page}&limit=${limit}`,
                first: `/api/categories?page=1&limit=${limit}`,
                previous: page > 1 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `/api/categories?page=${page + 1}&limit=${limit}` : null,
                last: `/api/categories?page=${totalPages}&limit=${limit}`,
            },
        };
    }

    async findOne(id: number) {
        if (isNaN(id) || id <= 0) {
            throw new NotFoundException(`Некорректный ID категории: ${id}`);
        }

        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['products'],
        });

        if (!category) {
            throw new NotFoundException(`Категория #${id} не найдена`);
        }

        return category;
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.findOne(id);
        Object.assign(category, updateCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async remove(id: number) {
        const category = await this.findOne(id);
        await this.categoryRepository.delete(id);
        return category;
    }

    async findProducts(categoryId: number) {
        const products = await this.productRepository.find({
            where: { categoryId },
            relations: ['category'],
            order: { createdAt: 'DESC' },
        });

        return {
            data: products,
            meta: { categoryId, total: products.length },
        };
    }
}