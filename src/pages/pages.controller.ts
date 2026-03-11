import { Controller, Get, Render, Query } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Controller()
export class PagesController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @Render('pages/index')
    async getIndexPage(@Query('auth') auth?: string) {
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
            currentPage: 'index'
        };
    }

    @Get('catalog')
    @Render('pages/catalog')
    async getCatalogPage(@Query('auth') auth?: string) {
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
            currentPage: 'catalog'
        };
    }

    @Get('cart')
    @Render('pages/cart')
    async getCartPage(@Query('auth') auth?: string) {
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
            currentPage: 'cart'
        };
    }

    @Get('about')
    @Render('pages/about')
    getAboutPage(@Query('auth') auth?: string) {
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

    @Get('credit')
    @Render('pages/credit')
    getCreditPage(@Query('auth') auth?: string) {
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
}