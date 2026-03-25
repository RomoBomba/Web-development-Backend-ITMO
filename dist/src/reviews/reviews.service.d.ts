import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
export declare class ReviewsService {
    private reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    findAll(): Promise<Review[]>;
    findAllPaginated(paginationDto: PaginationDto): Promise<{
        data: Review[];
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
    findOne(id: number): Promise<Review>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review>;
    remove(id: number): Promise<Review>;
    findByProduct(productId: number): Promise<{
        data: Review[];
        meta: {
            productId: number;
            total: number;
            averageRating: number;
        };
    }>;
    findByUser(userId: number): Promise<{
        data: Review[];
        meta: {
            userId: number;
            total: number;
        };
    }>;
}
