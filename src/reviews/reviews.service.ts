import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from '../products/dto/pagination.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) {}

    async create(createReviewDto: CreateReviewDto) {
        const existingReview = await this.reviewRepository.findOne({
            where: {
                userId: createReviewDto.userId,
                productId: createReviewDto.productId,
            },
        });

        if (existingReview) {
            throw new ConflictException('Вы уже оставляли отзыв на этот товар');
        }

        const review = this.reviewRepository.create(createReviewDto);
        return await this.reviewRepository.save(review);
    }

    async findAll() {
        return await this.reviewRepository.find({
            relations: ['user', 'product'],
        });
    }

    async findAllPaginated(paginationDto: PaginationDto) {
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

    async findOne(id: number) {
        if (isNaN(id) || id <= 0) {
            throw new NotFoundException(`Некорректный ID отзыва: ${id}`);
        }

        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['user', 'product'],
        });

        if (!review) {
            throw new NotFoundException(`Отзыв #${id} не найден`);
        }

        return review;
    }

    async update(id: number, updateReviewDto: UpdateReviewDto) {
        const review = await this.findOne(id);
        Object.assign(review, updateReviewDto);
        return await this.reviewRepository.save(review);
    }

    async remove(id: number) {
        const review = await this.findOne(id);
        await this.reviewRepository.delete(id);
        return review;
    }

    async findByProduct(productId: number) {
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

    async findByUser(userId: number) {
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

    async findAllPaginatedGraphQL(paginationDto: PaginationDto) {
        const page = paginationDto.page ?? 1;
        const limit = paginationDto.limit ?? 10;
        const skip = (page - 1) * limit;

        const [items, total] = await this.reviewRepository.findAndCount({
            relations: ['user', 'product'],
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