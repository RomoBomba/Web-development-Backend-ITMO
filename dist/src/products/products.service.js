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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const product_entity_1 = require("../entities/product.entity");
const category_entity_1 = require("../entities/category.entity");
const cache_manager_2 = require("@nestjs/cache-manager");
let ProductsService = class ProductsService {
    productRepository;
    categoryRepository;
    cacheManager;
    constructor(productRepository, categoryRepository, cacheManager) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.cacheManager = cacheManager;
    }
    async create(createProductDto) {
        const category = await this.categoryRepository.findOne({
            where: { id: createProductDto.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
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
    async findOne(id) {
        if (isNaN(id) || id <= 0) {
            throw new common_1.NotFoundException(`Некорректный ID товара: ${id}`);
        }
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Товар #${id} не найден`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        if (updateProductDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: updateProductDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            product.category = category;
        }
        Object.assign(product, updateProductDto);
        return await this.productRepository.save(product);
    }
    async remove(id) {
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
    async findAllPaginated(paginationDto) {
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
    async findByCategory(categoryId) {
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
    async findAllPaginatedGraphQL(paginationDto) {
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
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, common_1.Inject)(cache_manager_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cache_manager_1.Cache])
], ProductsService);
//# sourceMappingURL=products.service.js.map