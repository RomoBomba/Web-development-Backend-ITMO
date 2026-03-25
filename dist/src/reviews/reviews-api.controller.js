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
exports.ReviewsApiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("./reviews.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const update_review_dto_1 = require("./dto/update-review.dto");
const pagination_dto_1 = require("../products/dto/pagination.dto");
const review_entity_1 = require("../entities/review.entity");
let ReviewsApiController = class ReviewsApiController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    create(createReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }
    findAll(paginationDto) {
        return this.reviewsService.findAllPaginated(paginationDto);
    }
    findOne(id) {
        return this.reviewsService.findOne(+id);
    }
    update(id, updateReviewDto) {
        return this.reviewsService.update(+id, updateReviewDto);
    }
    remove(id) {
        return this.reviewsService.remove(+id);
    }
    findByProduct(productId) {
        return this.reviewsService.findByProduct(+productId);
    }
    findByUser(userId) {
        return this.reviewsService.findByUser(+userId);
    }
};
exports.ReviewsApiController = ReviewsApiController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новый отзыв' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Отзыв создан', type: review_entity_1.Review }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Отзыв уже существует' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsApiController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список отзывов (с пагинацией)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список отзывов', type: [review_entity_1.Review] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ReviewsApiController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить отзыв по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID отзыва', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв найден', type: review_entity_1.Review }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Отзыв не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsApiController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить отзыв' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID отзыва', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отзыв обновлен', type: review_entity_1.Review }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Отзыв не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsApiController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить отзыв' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID отзыва', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Отзыв удален' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Отзыв не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsApiController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить отзывы на товар' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'ID товара', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список отзывов на товар', type: [review_entity_1.Review] }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsApiController.prototype, "findByProduct", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить отзывы пользователя' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID пользователя', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список отзывов пользователя', type: [review_entity_1.Review] }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsApiController.prototype, "findByUser", null);
exports.ReviewsApiController = ReviewsApiController = __decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, common_1.Controller)('api/reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsApiController);
//# sourceMappingURL=reviews-api.controller.js.map