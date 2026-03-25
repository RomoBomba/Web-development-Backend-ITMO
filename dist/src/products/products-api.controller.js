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
exports.ProductsApiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
const product_entity_1 = require("../entities/product.entity");
let ProductsApiController = class ProductsApiController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    findAll(paginationDto) {
        return this.productsService.findAllPaginated(paginationDto);
    }
    findOne(id) {
        return this.productsService.findOne(+id);
    }
    update(id, updateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }
    remove(id) {
        return this.productsService.remove(+id);
    }
    findByCategory(categoryId) {
        return this.productsService.findByCategory(+categoryId);
    }
};
exports.ProductsApiController = ProductsApiController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новый товар' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Товар успешно создан', type: product_entity_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Конфликт данных' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsApiController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список товаров (с пагинацией)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список товаров', type: [product_entity_1.Product] }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные параметры' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ProductsApiController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить товар по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID товара', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Товар найден', type: product_entity_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Товар не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsApiController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить товар' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID товара', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Товар обновлен', type: product_entity_1.Product }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Товар не найден' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsApiController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить товар' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID товара', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Товар удален' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Товар не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsApiController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить товары по категории' }),
    (0, swagger_1.ApiParam)({ name: 'categoryId', description: 'ID категории', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список товаров категории', type: [product_entity_1.Product] }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsApiController.prototype, "findByCategory", null);
exports.ProductsApiController = ProductsApiController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('api/products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsApiController);
//# sourceMappingURL=products-api.controller.js.map