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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = __importDefault(require("express"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const users_service_1 = require("../users/users.service");
let ProductsController = class ProductsController {
    productsService;
    usersService;
    productCreatedSubject = new rxjs_1.Subject();
    productUpdatedSubject = new rxjs_1.Subject();
    productDeletedSubject = new rxjs_1.Subject();
    destroy$ = new rxjs_1.Subject();
    constructor(productsService, usersService) {
        this.productsService = productsService;
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
        }
        return { isAuthenticated: false, userName: null, userRole: null, userId: null };
    }
    events() {
        return (0, rxjs_1.merge)(this.productCreatedSubject.pipe((0, operators_1.takeUntil)(this.destroy$), (0, operators_1.map)((product) => ({
            data: JSON.stringify({
                id: product.id,
                name: product.name,
                price: product.price,
                message: `Новый товар: ${product.name}`,
                timestamp: new Date().toISOString(),
                type: 'product_created'
            })
        }))), this.productUpdatedSubject.pipe((0, operators_1.takeUntil)(this.destroy$), (0, operators_1.map)((product) => ({
            data: JSON.stringify({
                id: product.id,
                name: product.name,
                price: product.price,
                message: `Товар обновлен: ${product.name}`,
                timestamp: new Date().toISOString(),
                type: 'product_updated'
            })
        }))), this.productDeletedSubject.pipe((0, operators_1.takeUntil)(this.destroy$), (0, operators_1.map)((product) => ({
            data: JSON.stringify({
                id: product.id,
                name: product.name,
                message: `Товар удален: ${product.name}`,
                timestamp: new Date().toISOString(),
                type: 'product_deleted'
            })
        }))));
    }
    onModuleDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.productCreatedSubject.complete();
        this.productUpdatedSubject.complete();
        this.productDeletedSubject.complete();
    }
    async findAll(req) {
        const sessionInfo = await this.getSessionInfo(req);
        const products = await this.productsService.findAll();
        return {
            products,
            ...sessionInfo,
            title: 'Управление товарами',
            metaKeywords: 'управление товарами, администрирование, MusicStore',
            metaDescription: 'Панель управления товарами магазина MusicStore',
            currentPage: 'products',
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
            title: 'Добавить товар',
            metaKeywords: 'добавить товар, новый товар, MusicStore',
            metaDescription: 'Добавление нового товара в каталог MusicStore',
            currentPage: 'products',
            cartCount: 0,
            useSwiper: false,
            useInputMask: false,
            pageScript: null
        };
    }
    async create(createProductDto, res) {
        try {
            const newProduct = await this.productsService.create(createProductDto);
            console.log('✅ Товар создан:', newProduct.id);
            this.productCreatedSubject.next({
                id: newProduct.id,
                name: newProduct.name,
                price: newProduct.price,
                message: `Создан новый товар: ${newProduct.name}`,
                timestamp: new Date().toISOString(),
                type: 'product_created'
            });
            res.redirect('/products');
        }
        catch (error) {
            console.error('Ошибка создания:', error);
            res.redirect('/products/add');
        }
    }
    async findOne(id, req) {
        const sessionInfo = await this.getSessionInfo(req);
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            return { redirect: '/products' };
        }
        try {
            const product = await this.productsService.findOne(productId);
            if (!product) {
                return { redirect: '/products' };
            }
            return {
                product,
                ...sessionInfo,
                title: product.name,
                metaKeywords: `${product.name}, купить, MusicStore`,
                metaDescription: product.description || `Купить ${product.name} в MusicStore`,
                currentPage: 'products',
                cartCount: 0,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
        catch (error) {
            console.error(`Ошибка поиска товара ${productId}:`, error);
            return {
                product: null,
                ...sessionInfo,
                title: 'Товар не найден',
                currentPage: 'products',
                cartCount: 0,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
    }
    async editForm(id, req) {
        const sessionInfo = await this.getSessionInfo(req);
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            return { redirect: '/products' };
        }
        try {
            const product = await this.productsService.findOne(productId);
            if (!product) {
                return { redirect: '/products' };
            }
            return {
                product,
                ...sessionInfo,
                title: `Редактировать: ${product.name}`,
                metaKeywords: 'редактировать товар, MusicStore',
                metaDescription: `Редактирование товара ${product.name}`,
                currentPage: 'products',
                cartCount: 0,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
        catch (error) {
            console.error(`Ошибка поиска товара ${productId}:`, error);
            return {
                product: null,
                ...sessionInfo,
                title: 'Товар не найден',
                currentPage: 'products',
                cartCount: 0,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
    }
    async update(id, updateProductDto, res) {
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            return res.redirect('/products');
        }
        try {
            const updatedProduct = await this.productsService.update(productId, updateProductDto);
            if (!updatedProduct) {
                return res.redirect('/products');
            }
            console.log('Товар обновлен:', productId);
            this.productUpdatedSubject.next({
                id: updatedProduct.id,
                name: updatedProduct.name,
                price: updatedProduct.price,
                message: `Товар обновлен: ${updatedProduct.name}`,
                timestamp: new Date().toISOString(),
                type: 'product_updated'
            });
            res.redirect('/products');
        }
        catch (error) {
            console.error(`Ошибка обновления ${productId}:`, error);
            res.redirect(`/products/${productId}/edit`);
        }
    }
    async remove(id, res) {
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            return res.redirect('/products');
        }
        try {
            let productName = 'Товар';
            try {
                const product = await this.productsService.findOne(productId);
                productName = product?.name || `Товар #${productId}`;
            }
            catch {
                productName = `Товар #${productId}`;
            }
            await this.productsService.remove(productId);
            console.log('✅ Товар удален:', productId);
            this.productDeletedSubject.next({
                id: productId,
                name: productName,
                message: `Товар удален: ${productName}`,
                timestamp: new Date().toISOString(),
                type: 'product_deleted'
            });
            res.redirect('/products');
        }
        catch (error) {
            console.error(`Ошибка удаления ${productId}:`, error);
            res.redirect('/products');
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductsController.prototype, "events", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Render)('products/index'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('add'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Render)('products/add'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createForm", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('products/show'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/edit'),
    (0, common_1.Render)('products/edit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "editForm", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        users_service_1.UsersService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map