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
exports.PagesController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = __importDefault(require("express"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const products_service_1 = require("../products/products.service");
const users_service_1 = require("../users/users.service");
let PagesController = class PagesController {
    productsService;
    usersService;
    constructor(productsService, usersService) {
        this.productsService = productsService;
        this.usersService = usersService;
    }
    async getSessionInfo(req, res) {
        console.log('🔍 getSessionInfo called');
        try {
            const session = await session_1.default.getSession(req, res, { sessionRequired: false });
            console.log('✅ Session found:', session ? 'yes' : 'no');
            if (session) {
                const payload = session.getAccessTokenPayload();
                const userId = session.getUserId();
                const role = payload?.userPayload?.role || payload?.role || 'user';
                console.log(`👤 User ID: ${userId}, Role: ${role}`);
                console.log(`👤 Full payload:`, JSON.stringify(payload));
                let userName = 'Пользователь';
                try {
                    const user = await this.usersService.findBySupertokensId(userId);
                    userName = user?.name || 'Пользователь';
                }
                catch (dbError) {
                    console.log('⚠️ DB error when getting user:', dbError.message);
                }
                return {
                    isAuthenticated: true,
                    userName,
                    userRole: role,
                    userId,
                };
            }
        }
        catch (error) {
            console.log('❌ No session:', error.message);
        }
        return { isAuthenticated: false, userName: null, userRole: null, userId: null };
    }
    async getIndexPage(req, res) {
        console.log('🏠 GET /');
        const sessionInfo = await this.getSessionInfo(req, res);
        console.log('Session info:', sessionInfo);
        const result = await this.productsService.getPopularProducts();
        const products = Array.isArray(result) ? result : result.data || [];
        return {
            title: 'MusicStore - Магазин гитар',
            metaKeywords: 'гитары, купить гитару, музыкальные инструменты',
            metaDescription: 'MusicStore - лучший магазин гитар в городе',
            ...sessionInfo,
            products,
            cartCount: 0,
            useSwiper: true,
            useInputMask: true,
            pageScript: 'main.js',
            currentPage: 'index',
        };
    }
    async getCatalogPage(req, res) {
        const sessionInfo = await this.getSessionInfo(req, res);
        const allProducts = await this.productsService.findAll();
        return {
            title: 'MusicStore - Каталог гитар',
            metaKeywords: 'каталог гитар, купить гитару, электрогитары',
            metaDescription: 'Полный каталог гитар в магазине MusicStore',
            ...sessionInfo,
            allProducts,
            cartCount: 0,
            useSwiper: false,
            useInputMask: false,
            pageScript: 'catalog-page.js',
            currentPage: 'catalog',
        };
    }
    async getCartPage(req, res) {
        const sessionInfo = await this.getSessionInfo(req, res);
        const recommendedProducts = await this.productsService.getRecommendedProducts();
        return {
            title: 'MusicStore - Корзина',
            metaKeywords: 'корзина, заказ, покупка гитары, оформление заказа',
            metaDescription: 'Корзина покупок MusicStore',
            ...sessionInfo,
            cartItemsCount: 0,
            recommendedProducts,
            useSwiper: false,
            useInputMask: true,
            pageScript: 'main.js',
            currentPage: 'cart',
        };
    }
    async getAboutPage(req, res) {
        const sessionInfo = await this.getSessionInfo(req, res);
        return {
            title: 'MusicStore - О нас',
            metaKeywords: 'о магазине MusicStore, история, команда, отзывы',
            metaDescription: 'О магазине MusicStore - наша история, команда и философия',
            ...sessionInfo,
            cartCount: 0,
            useSwiper: false,
            useInputMask: false,
            pageScript: 'main.js',
            currentPage: 'about',
        };
    }
    async getCreditPage(req, res) {
        const sessionInfo = await this.getSessionInfo(req, res);
        return {
            title: 'MusicStore - Кредит',
            metaKeywords: 'кредит на гитару, рассрочка, покупка гитары в кредит',
            metaDescription: 'Оформите кредит или рассрочку на покупку гитары в MusicStore',
            ...sessionInfo,
            cartCount: 0,
            useSwiper: false,
            useInputMask: true,
            pageScript: 'main.js',
            currentPage: 'credit',
        };
    }
    async getProfilePage(req, res) {
        const sessionInfo = await this.getSessionInfo(req, res);
        if (!sessionInfo.isAuthenticated) {
            return { redirect: '/login' };
        }
        const user = await this.usersService.findBySupertokensId(sessionInfo.userId);
        return {
            title: 'Мой профиль',
            metaDescription: 'Управление профилем в MusicStore',
            currentPage: 'profile',
            cartCount: 0,
            ...sessionInfo,
            userName: user?.name || sessionInfo.userName,
            userEmail: user?.email,
            useSwiper: false,
            useInputMask: false,
            pageScript: null,
        };
    }
    async getOrdersPage(req, res) {
        const sessionInfo = await this.getSessionInfo(req, res);
        if (!sessionInfo.isAuthenticated) {
            return { redirect: '/login' };
        }
        return {
            title: 'Мои заказы',
            metaDescription: 'История заказов в MusicStore',
            currentPage: 'orders',
            cartCount: 0,
            ...sessionInfo,
            useSwiper: false,
            useInputMask: false,
            pageScript: null,
        };
    }
    async getLoginPage() {
        return {
            title: 'Вход в MusicStore',
            metaDescription: 'Войдите в свой аккаунт MusicStore',
            currentPage: 'login',
            cartCount: 0,
            isAuthenticated: false,
            userName: null,
            userRole: null,
            useSwiper: false,
            useInputMask: false,
            pageScript: null,
        };
    }
    async getRegisterPage() {
        return {
            title: 'Регистрация в MusicStore',
            metaDescription: 'Создайте аккаунт в MusicStore',
            currentPage: 'register',
            cartCount: 0,
            isAuthenticated: false,
            userName: null,
            userRole: null,
            useSwiper: false,
            useInputMask: false,
            pageScript: null,
        };
    }
};
exports.PagesController = PagesController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('pages/index'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getIndexPage", null);
__decorate([
    (0, common_1.Get)('catalog'),
    (0, common_1.Render)('pages/catalog'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getCatalogPage", null);
__decorate([
    (0, common_1.Get)('cart'),
    (0, common_1.Render)('pages/cart'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getCartPage", null);
__decorate([
    (0, common_1.Get)('about'),
    (0, common_1.Render)('pages/about'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getAboutPage", null);
__decorate([
    (0, common_1.Get)('credit'),
    (0, common_1.Render)('pages/credit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getCreditPage", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.Render)('pages/profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getProfilePage", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, common_1.Render)('pages/orders'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getOrdersPage", null);
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Render)('pages/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getLoginPage", null);
__decorate([
    (0, common_1.Get)('register'),
    (0, common_1.Render)('pages/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getRegisterPage", null);
exports.PagesController = PagesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        users_service_1.UsersService])
], PagesController);
//# sourceMappingURL=pages.controller.js.map