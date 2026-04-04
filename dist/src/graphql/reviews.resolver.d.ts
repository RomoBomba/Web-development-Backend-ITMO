import { CreateReviewInput, UpdateReviewInput } from '../graphql/create-review.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { ReviewsService } from "../reviews/reviews.service";
export declare class ReviewsResolver {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    reviews(pagination: PaginationArgs): Promise<{
        data: import("../entities/review.entity").Review[];
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
    review(id: number): Promise<import("../entities/review.entity").Review>;
    createReview(data: CreateReviewInput): Promise<import("../entities/review.entity").Review>;
    updateReview(data: UpdateReviewInput): Promise<import("../entities/review.entity").Review>;
    deleteReview(id: number): Promise<import("../entities/review.entity").Review>;
    productReviews(productId: number): Promise<{
        data: import("../entities/review.entity").Review[];
        meta: {
            productId: number;
            total: number;
            averageRating: number;
        };
    }>;
    userReviews(userId: number): Promise<{
        data: import("../entities/review.entity").Review[];
        meta: {
            userId: number;
            total: number;
        };
    }>;
}
