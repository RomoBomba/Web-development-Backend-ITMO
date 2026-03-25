import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    findAll(): Promise<{
        reviews: import("../entities/review.entity").Review[];
        title: string;
        currentPage: string;
        cartCount: number;
        isAuthenticated: boolean;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
    }>;
    createForm(): {};
    create(createReviewDto: CreateReviewDto): Promise<{
        redirect: string;
    }>;
    findOne(id: string): Promise<{
        review: import("../entities/review.entity").Review;
    }>;
    editForm(id: string): Promise<{
        review: import("../entities/review.entity").Review;
    }>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<{
        redirect: string;
    }>;
    remove(id: string): Promise<{
        redirect: string;
    }>;
}
