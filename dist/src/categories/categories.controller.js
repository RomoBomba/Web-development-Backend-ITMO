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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = __importDefault(require("express"));
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const users_service_1 = require("../users/users.service");
let CategoriesController = class CategoriesController {
    categoriesService;
    usersService;
    constructor(categoriesService, usersService) {
        this.categoriesService = categoriesService;
        this.usersService = usersService;
    }
    async getSessionInfo(req) {
        try {
            const session = await session_1.default.getSession(req, req.res);
            if (session) {
                const payload = session.getAccessTokenPayload();
                const userId = session.getUserId();
                const user = await this.usersService.findBySupertokensId(userId);
                return {
                    isAuthenticated: true,
                    userName: user?.name || 'Пользователь',
                    userRole: payload.role || user?.role || 'user',
                    userId,
                };
            }
        }
        catch (error) {
            console.log('🔍 getSessionInfo error:', error.message);
        }
        return { isAuthenticated: false, userName: null, userRole: null, userId: null };
    }
    async findAll(req) {
        console.log('🔍 CategoriesController.findAll called');
        const sessionInfo = await this.getSessionInfo(req);
        console.log('📊 Session info:', sessionInfo);
        const categories = await this.categoriesService.findAll();
        return {
            categories,
            ...sessionInfo,
            title: 'Управление категориями',
            metaKeywords: 'управление категориями, администрирование',
            metaDescription: 'Панель управления категориями магазина MusicStore',
            currentPage: 'categories',
            cartCount: 0,
            useSwiper: false,
            useInputMask: false,
            pageScript: null
        };
    }
    async createForm(req) {
        const sessionInfo = await this.getSessionInfo(req);
        return {
            ...sessionInfo,
            title: 'Добавить категорию',
            metaKeywords: 'добавить категорию, новая категория',
            metaDescription: 'Добавление новой категории в каталог MusicStore',
            currentPage: 'categories',
            cartCount: 0,
            useSwiper: false,
            useInputMask: false,
            pageScript: null
        };
    }
    async create(createCategoryDto, res) {
        await this.categoriesService.create(createCategoryDto);
        res.redirect('/categories');
    }
    async findOne(id, req) {
        const sessionInfo = await this.getSessionInfo(req);
        const categoryId = parseInt(id, 10);
        if (isNaN(categoryId)) {
            return { redirect: '/categories' };
        }
        try {
            const category = await this.categoriesService.findOne(categoryId);
            return {
                category,
                ...sessionInfo,
                title: category.name,
                metaKeywords: `${category.name}, категория, MusicStore`,
                metaDescription: `Категория ${category.name} в магазине MusicStore`,
                currentPage: 'categories',
                cartCount: 0,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
        catch (error) {
            return {
                category: null,
                ...sessionInfo,
                title: 'Категория не найдена',
                currentPage: 'categories',
                cartCount: 0,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
    }
    async editForm(id, req) {
        const sessionInfo = await this.getSessionInfo(req);
        const categoryId = parseInt(id, 10);
        if (isNaN(categoryId)) {
            return { redirect: '/categories' };
        }
        try {
            const category = await this.categoriesService.findOne(categoryId);
            return {
                category,
                ...sessionInfo,
                title: `Редактировать: ${category.name}`,
                metaKeywords: 'редактировать категорию',
                metaDescription: `Редактирование категории ${category.name}`,
                currentPage: 'categories',
                cartCount: 0,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
        catch (error) {
            return {
                category: null,
                ...sessionInfo,
                title: 'Категория не найдена',
                currentPage: 'categories',
                cartCount: 0,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
    }
    async update(id, updateCategoryDto, res) {
        const categoryId = parseInt(id, 10);
        if (isNaN(categoryId)) {
            return res.redirect('/categories');
        }
        try {
            await this.categoriesService.update(categoryId, updateCategoryDto);
            res.redirect('/categories');
        }
        catch (error) {
            res.redirect(`/categories/${categoryId}/edit`);
        }
    }
    async remove(id, res) {
        const categoryId = parseInt(id, 10);
        if (isNaN(categoryId)) {
            return res.redirect('/categories');
        }
        try {
            await this.categoriesService.remove(categoryId);
            res.redirect('/categories');
        }
        catch (error) {
            res.redirect('/categories');
        }
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Render)('categories/index'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('add'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Render)('categories/add'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createForm", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('categories/show'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/edit'),
    (0, common_1.Render)('categories/edit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "editForm", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        users_service_1.UsersService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map