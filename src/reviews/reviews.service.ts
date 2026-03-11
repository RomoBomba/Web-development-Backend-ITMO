import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
    ) {}

    async create(createReviewDto: CreateReviewDto) {
        const review = this.reviewRepository.create(createReviewDto);
        return await this.reviewRepository.save(review);
    }

    async findAll() {
        return await this.reviewRepository.find({
            relations: ['user', 'product'],
        });
    }

    async findOne(id: number) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['user', 'product'],
        });

        if (!review) {
            throw new NotFoundException(`Review #${id} not found`);
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
        return await this.reviewRepository.remove(review);
    }
}