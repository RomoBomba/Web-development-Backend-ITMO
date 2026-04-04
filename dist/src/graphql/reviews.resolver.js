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
exports.ReviewsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const review_type_1 = require("../graphql/review.type");
const create_review_input_1 = require("../graphql/create-review.input");
const pagination_args_1 = require("../graphql/pagination.args");
const pagination_type_1 = require("../graphql/pagination.type");
const reviews_service_1 = require("../reviews/reviews.service");
const PaginatedReview = (0, pagination_type_1.Paginated)(review_type_1.ReviewType);
let ReviewsResolver = class ReviewsResolver {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async reviews(pagination) {
        return this.reviewsService.findAllPaginated(pagination);
    }
    async review(id) {
        return this.reviewsService.findOne(id);
    }
    async createReview(data) {
        return this.reviewsService.create(data);
    }
    async updateReview(data) {
        return this.reviewsService.update(data.id, data);
    }
    async deleteReview(id) {
        return this.reviewsService.remove(id);
    }
    async productReviews(productId) {
        return this.reviewsService.findByProduct(productId);
    }
    async userReviews(userId) {
        return this.reviewsService.findByUser(userId);
    }
};
exports.ReviewsResolver = ReviewsResolver;
__decorate([
    (0, graphql_1.Query)(() => PaginatedReview),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], ReviewsResolver.prototype, "reviews", null);
__decorate([
    (0, graphql_1.Query)(() => review_type_1.ReviewType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewsResolver.prototype, "review", null);
__decorate([
    (0, graphql_1.Mutation)(() => review_type_1.ReviewType),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_input_1.CreateReviewInput]),
    __metadata("design:returntype", Promise)
], ReviewsResolver.prototype, "createReview", null);
__decorate([
    (0, graphql_1.Mutation)(() => review_type_1.ReviewType),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_input_1.UpdateReviewInput]),
    __metadata("design:returntype", Promise)
], ReviewsResolver.prototype, "updateReview", null);
__decorate([
    (0, graphql_1.Mutation)(() => review_type_1.ReviewType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewsResolver.prototype, "deleteReview", null);
__decorate([
    (0, graphql_1.Query)(() => [review_type_1.ReviewType]),
    __param(0, (0, graphql_1.Args)('productId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewsResolver.prototype, "productReviews", null);
__decorate([
    (0, graphql_1.Query)(() => [review_type_1.ReviewType]),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewsResolver.prototype, "userReviews", null);
exports.ReviewsResolver = ReviewsResolver = __decorate([
    (0, graphql_1.Resolver)(() => review_type_1.ReviewType),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsResolver);
//# sourceMappingURL=reviews.resolver.js.map