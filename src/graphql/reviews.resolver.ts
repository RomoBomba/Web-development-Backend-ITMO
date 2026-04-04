import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewType } from '../graphql/review.type';
import { CreateReviewInput, UpdateReviewInput } from '../graphql/create-review.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { Paginated } from '../graphql/pagination.type';
import {ReviewsService} from "../reviews/reviews.service";

const PaginatedReview = Paginated(ReviewType);

@Resolver(() => ReviewType)
export class ReviewsResolver {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Query(() => PaginatedReview)
    async reviews(@Args() pagination: PaginationArgs) {
        return this.reviewsService.findAllPaginated(pagination);
    }

    @Query(() => ReviewType)
    async review(@Args('id', { type: () => Int }) id: number) {
        return this.reviewsService.findOne(id);
    }

    @Mutation(() => ReviewType)
    async createReview(@Args('data') data: CreateReviewInput) {
        return this.reviewsService.create(data);
    }

    @Mutation(() => ReviewType)
    async updateReview(@Args('data') data: UpdateReviewInput) {
        return this.reviewsService.update(data.id, data);
    }

    @Mutation(() => ReviewType)
    async deleteReview(@Args('id', { type: () => Int }) id: number) {
        return this.reviewsService.remove(id);
    }

    @Query(() => [ReviewType])
    async productReviews(@Args('productId', { type: () => Int }) productId: number) {
        return this.reviewsService.findByProduct(productId);
    }

    @Query(() => [ReviewType])
    async userReviews(@Args('userId', { type: () => Int }) userId: number) {
        return this.reviewsService.findByUser(userId);
    }
}