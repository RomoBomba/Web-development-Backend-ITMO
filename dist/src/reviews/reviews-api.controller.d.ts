import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
import { Review } from '../entities/review.entity';
export declare class ReviewsApiController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    findAll(paginationDto: PaginationDto): Promise<{
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
    findOne(id: string): Promise<Review>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review>;
    remove(id: string): Promise<Review>;
    findByProduct(productId: string): Promise<{
        data: Review[];
        meta: {
            productId: number;
            total: number;
            averageRating: number;
        };
    }>;
    findByUser(userId: string): Promise<{
        data: Review[];
        meta: {
            userId: number;
            total: number;
        };
    }>;
}
