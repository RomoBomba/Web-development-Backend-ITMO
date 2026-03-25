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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("../entities/review.entity");
let ReviewsService = class ReviewsService {
    reviewRepository;
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async create(createReviewDto) {
        const existingReview = await this.reviewRepository.findOne({
            where: {
                userId: createReviewDto.userId,
                productId: createReviewDto.productId,
            },
        });
        if (existingReview) {
            throw new common_1.ConflictException('Вы уже оставляли отзыв на этот товар');
        }
        const review = this.reviewRepository.create(createReviewDto);
        return await this.reviewRepository.save(review);
    }
    async findAll() {
        return await this.reviewRepository.find({
            relations: ['user', 'product'],
        });
    }
    async findAllPaginated(paginationDto) {
        const page = paginationDto.page ?? 1;
        const limit = paginationDto.limit ?? 10;
        const skip = (page - 1) * limit;
        const [data, total] = await this.reviewRepository.findAndCount({
            relations: ['user', 'product'],
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        const totalPages = Math.ceil(total / limit);
        return {
            data,
            meta: { page, limit, total, totalPages },
            links: {
                self: `/api/reviews?page=${page}&limit=${limit}`,
                first: `/api/reviews?page=1&limit=${limit}`,
                previous: page > 1 ? `/api/reviews?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `/api/reviews?page=${page + 1}&limit=${limit}` : null,
                last: `/api/reviews?page=${totalPages}&limit=${limit}`,
            },
        };
    }
    async findOne(id) {
        if (isNaN(id) || id <= 0) {
            throw new common_1.NotFoundException(`Некорректный ID отзыва: ${id}`);
        }
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['user', 'product'],
        });
        if (!review) {
            throw new common_1.NotFoundException(`Отзыв #${id} не найден`);
        }
        return review;
    }
    async update(id, updateReviewDto) {
        const review = await this.findOne(id);
        Object.assign(review, updateReviewDto);
        return await this.reviewRepository.save(review);
    }
    async remove(id) {
        const review = await this.findOne(id);
        await this.reviewRepository.delete(id);
        return review;
    }
    async findByProduct(productId) {
        const reviews = await this.reviewRepository.find({
            where: { productId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
        const averageRating = reviews.length
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
        return {
            data: reviews,
            meta: {
                productId,
                total: reviews.length,
                averageRating: Math.round(averageRating * 10) / 10,
            },
        };
    }
    async findByUser(userId) {
        const reviews = await this.reviewRepository.find({
            where: { userId },
            relations: ['product'],
            order: { createdAt: 'DESC' },
        });
        return {
            data: reviews,
            meta: { userId, total: reviews.length },
        };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map