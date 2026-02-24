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
let PagesController = class PagesController {
    getPopularProducts() {
        return [
            {
                id: 'squier-hellokitty',
                name: 'Squier Hello Kitty Stratocaster',
                currentPrice: 65000,
                oldPrice: 70000,
                image: '/images/guitars/hellokitty.png',
                description: 'Лимитированная гитара, в честь 50-летия Hello Kitty.',
                caption: 'Лимитированная серия'
            },
            {
                id: 'bcrich-kkv',
                name: 'B.C. Rich Kerry King V',
                currentPrice: 68000,
                oldPrice: 75000,
                image: '/images/guitars/bcrich.jpg',
                description: 'Популярная модель с агрессивной формой.',
                caption: 'Агрессивный дизайн'
            },
            {
                id: 'epiphone-thunderbird',
                name: 'Epiphone Thunderbird IV',
                currentPrice: 43500,
                oldPrice: 55000,
                image: '/images/guitars/bass1.jpg',
                description: 'Легендарная бас-гитара с топом из махагони.',
                caption: 'Классический бас'
            },
        ];
    }
    getAllProducts() {
        return [
            ...this.getPopularProducts(),
            {
                id: 'fender-strat',
                name: 'Fender American Professional II Stratocaster',
                currentPrice: 145000,
                image: '/images/guitars/fender-strat.png',
                description: 'Электрогитара, цвет sunburst'
            },
            {
                id: 'yamaha-fg800',
                name: 'Yamaha FG800',
                currentPrice: 18500,
                image: '/images/guitars/yamaha-fg800.png',
                description: 'Акустическая гитара, натуральный цвет'
            },
        ];
    }
    getRecommendedProducts() {
        return [
            {
                id: 'elixir-strings',
                name: 'Комплект струн Elixir',
                currentPrice: 2200,
                image: '/images/addition/strings-elixir.png',
                description: 'Наноструктурное покрытие для долгого срока службы.'
            },
            {
                id: 'dunlop-picks',
                name: 'Медиаторы Dunlop',
                currentPrice: 800,
                image: '/images/addition/picks-dunlop.png',
                description: 'Набор из 12 медиаторов разной толщины.'
            },
            {
                id: 'cort-cable',
                name: 'Гитарный кабель Cort',
                currentPrice: 1500,
                image: '/images/addition/cable.png',
                description: 'Качественный кабель длиной 3 метра.'
            },
        ];
    }
    getIndexPage(auth) {
        return {
            title: 'MusicStore - Магазин гитар',
            metaKeywords: 'гитары, купить гитару, музыкальные инструменты',
            metaDescription: 'MusicStore - лучший магазин гитар в городе',
            isAuthenticated: auth === 'true',
            products: this.getPopularProducts(),
            cartCount: 0,
            useSwiper: true,
            useInputMask: true,
            pageScript: 'main.js',
            currentPage: 'index'
        };
    }
    getCatalogPage(auth) {
        return {
            title: 'MusicStore - Каталог гитар',
            metaKeywords: 'каталог гитар, купить гитару, электрогитары',
            metaDescription: 'Полный каталог гитар в магазине MusicStore',
            isAuthenticated: auth === 'true',
            allProducts: this.getAllProducts(),
            cartCount: 0,
            useSwiper: false,
            useInputMask: false,
            pageScript: 'catalog-page.js',
            currentPage: 'catalog'
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
            currentPage: 'about'
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
            currentPage: 'credit'
        };
    }
    getCartPage(auth) {
        return {
            title: 'MusicStore - Корзина',
            metaKeywords: 'корзина, заказ, покупка гитары, оформление заказа',
            metaDescription: 'Корзина покупок MusicStore',
            isAuthenticated: auth === 'true',
            cartItemsCount: 0,
            recommendedProducts: this.getRecommendedProducts(),
            useSwiper: false,
            useInputMask: true,
            pageScript: 'main.js',
            currentPage: 'cart'
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
    __metadata("design:returntype", void 0)
], PagesController.prototype, "getIndexPage", null);
__decorate([
    (0, common_1.Get)('catalog'),
    (0, common_1.Render)('pages/catalog'),
    __param(0, (0, common_1.Query)('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "getCatalogPage", null);
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
__decorate([
    (0, common_1.Get)('cart'),
    (0, common_1.Render)('pages/cart'),
    __param(0, (0, common_1.Query)('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagesController.prototype, "getCartPage", null);
exports.PagesController = PagesController = __decorate([
    (0, common_1.Controller)()
], PagesController);
//# sourceMappingURL=pages.controller.js.map