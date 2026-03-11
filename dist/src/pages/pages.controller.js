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
exports.PagesController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../products/products.service");
let PagesController = class PagesController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getIndexPage(auth) {
        const products = await this.productsService.getPopularProducts();
        return {
            title: 'MusicStore - Магазин гитар',
            metaKeywords: 'гитары, купить гитару, музыкальные инструменты',
            metaDescription: 'MusicStore - лучший магазин гитар в городе',
            isAuthenticated: auth === 'true',
            products,
            cartCount: 0,
            useSwiper: true,
            useInputMask: true,
            pageScript: 'main.js',
            currentPage: 'index',
        };
    }
    async getCatalogPage(auth) {
        const allProducts = await this.productsService.findAll();
        return {
            title: 'MusicStore - Каталог гитар',
            metaKeywords: 'каталог гитар, купить гитару, электрогитары',
            metaDescription: 'Полный каталог гитар в магазине MusicStore',
            isAuthenticated: auth === 'true',
            allProducts,
            cartCount: 0,
            useSwiper: false,
            useInputMask: false,
            pageScript: 'catalog-page.js',
            currentPage: 'catalog',
        };
    }
    async getCartPage(auth) {
        const recommendedProducts = await this.productsService.getRecommendedProducts();
        return {
            title: 'MusicStore - Корзина',
            metaKeywords: 'корзина, заказ, покупка гитары, оформление заказа',
            metaDescription: 'Корзина покупок MusicStore',
            isAuthenticated: auth === 'true',
            cartItemsCount: 0,
            recommendedProducts,
            useSwiper: false,
            useInputMask: true,
            pageScript: 'main.js',
            currentPage: 'cart',
        };
    }
    getAboutPage(auth) {
        return {
            title: 'MusicStore - О нас',
            metaKeywords: 'о магазине MusicStore, история, команда, отзывы',
            metaDescription: 'О магазине MusicStore - наша история, команда и философия',
            isAuthenticated: auth === 'true',
            cartCount: 0,
            useSwiper: false,
            useInputMask: false,
            pageScript: 'main.js',
            currentPage: 'about',
        };
    }
    getCreditPage(auth) {
        return {
            title: 'MusicStore - Кредит',
            metaKeywords: 'кредит на гитару, рассрочка, покупка гитары в кредит',
            metaDescription: 'Оформите кредит или рассрочку на покупку гитары в MusicStore',
            isAuthenticated: auth === 'true',
            cartCount: 0,
            useSwiper: false,
            useInputMask: true,
            pageScript: 'main.js',
            currentPage: 'credit',
        };
    }
};
exports.PagesController = PagesController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('pages/index'),
    __param(0, (0, common_1.Query)('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getIndexPage", null);
__decorate([
    (0, common_1.Get)('catalog'),
    (0, common_1.Render)('pages/catalog'),
    __param(0, (0, common_1.Query)('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getCatalogPage", null);
__decorate([
    (0, common_1.Get)('cart'),
    (0, common_1.Render)('pages/cart'),
    __param(0, (0, common_1.Query)('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getCartPage", null);
__decorate([
    (0, common_1.Get)('about'),
    (0, common_1.Render)('pages/about'),
    __param(0, (0, common_1.Query)('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "getAboutPage", null);
__decorate([
    (0, common_1.Get)('credit'),
    (0, common_1.Render)('pages/credit'),
    __param(0, (0, common_1.Query)('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "getCreditPage", null);
exports.PagesController = PagesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], PagesController);
//# sourceMappingURL=pages.controller.js.map