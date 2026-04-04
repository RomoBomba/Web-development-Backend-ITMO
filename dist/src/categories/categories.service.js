"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../entities/category.entity");
const product_entity_1 = require("../entities/product.entity");
let CategoriesService = class CategoriesService {
    categoryRepository;
    productRepository;
    constructor(categoryRepository, productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    async create(createCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }
    async findAll() {
        return await this.categoryRepository.find({
            relations: ['products'],
        });
    }
    async findAllPaginated(paginationDto) {
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
    async findOne(id) {
        if (isNaN(id) || id <= 0) {
            throw new common_1.NotFoundException(`Некорректный ID категории: ${id}`);
        }
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!category) {
            throw new common_1.NotFoundException(`Категория #${id} не найдена`);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        const category = await this.findOne(id);
        Object.assign(category, updateCategoryDto);
        return await this.categoryRepository.save(category);
    }
    async remove(id) {
        const category = await this.findOne(id);
        await this.categoryRepository.delete(id);
        return category;
    }
    async findProducts(categoryId) {
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
    async findAllPaginatedGraphQL(paginationDto) {
        const page = paginationDto.page ?? 1;
        const limit = paginationDto.limit ?? 10;
        const skip = (page - 1) * limit;
        const [items, total] = await this.categoryRepository.findAndCount({
            skip,
            take: limit,
            order: { name: 'ASC' },
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
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map