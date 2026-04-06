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
exports.CategoriesApiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const pagination_dto_1 = require("../products/dto/pagination.dto");
const category_entity_1 = require("../entities/category.entity");
const product_entity_1 = require("../entities/product.entity");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
let CategoriesApiController = class CategoriesApiController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(createCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }
    findAll(paginationDto) {
        return this.categoriesService.findAllPaginated(paginationDto);
    }
    findOne(id) {
        return this.categoriesService.findOne(+id);
    }
    update(id, updateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto);
    }
    remove(id) {
        return this.categoriesService.remove(+id);
    }
    findProducts(id) {
        return this.categoriesService.findProducts(+id);
    }
};
exports.CategoriesApiController = CategoriesApiController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую категорию' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Категория создана', type: category_entity_1.Category }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesApiController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список категорий (с пагинацией)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список категорий', type: [category_entity_1.Category] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], CategoriesApiController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить категорию по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID категории', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Категория найдена', type: category_entity_1.Category }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Категория не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesApiController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить категорию' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID категории', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Категория обновлена', type: category_entity_1.Category }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Категория не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesApiController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить категорию' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID категории', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Категория удалена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Категория не найдена' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesApiController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/products'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить товары категории' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID категории', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список товаров категории', type: [product_entity_1.Product] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesApiController.prototype, "findProducts", null);
exports.CategoriesApiController = CategoriesApiController = __decorate([
    (0, swagger_1.ApiTags)('categories'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('api/categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesApiController);
//# sourceMappingURL=categories-api.controller.js.map