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
exports.CategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const category_type_1 = require("../graphql/category.type");
const create_category_input_1 = require("../graphql/create-category.input");
const pagination_args_1 = require("../graphql/pagination.args");
const pagination_type_1 = require("../graphql/pagination.type");
const categories_service_1 = require("../categories/categories.service");
const product_type_1 = require("./product.type");
const PaginatedCategory = (0, pagination_type_1.Paginated)(category_type_1.CategoryType);
let CategoriesResolver = class CategoriesResolver {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async categories(pagination) {
        return this.categoriesService.findAllPaginatedGraphQL(pagination);
    }
    async category(id) {
        return this.categoriesService.findOne(id);
    }
    async createCategory(data) {
        return this.categoriesService.create(data);
    }
    async updateCategory(data) {
        return this.categoriesService.update(data.id, data);
    }
    async deleteCategory(id) {
        return this.categoriesService.remove(id);
    }
    async categoryProducts(categoryId) {
        const result = await this.categoriesService.findProducts(categoryId);
        return result.data;
    }
};
exports.CategoriesResolver = CategoriesResolver;
__decorate([
    (0, graphql_1.Query)(() => PaginatedCategory),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "categories", null);
__decorate([
    (0, graphql_1.Query)(() => category_type_1.CategoryType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "category", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_type_1.CategoryType),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_input_1.CreateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "createCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_type_1.CategoryType),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_input_1.UpdateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "updateCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => category_type_1.CategoryType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "deleteCategory", null);
__decorate([
    (0, graphql_1.Query)(() => [product_type_1.ProductType]),
    __param(0, (0, graphql_1.Args)('categoryId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "categoryProducts", null);
exports.CategoriesResolver = CategoriesResolver = __decorate([
    (0, graphql_1.Resolver)(() => category_type_1.CategoryType),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesResolver);
//# sourceMappingURL=categories.resolver.js.map