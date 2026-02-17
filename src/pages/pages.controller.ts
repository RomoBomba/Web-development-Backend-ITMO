import { Controller, Get, Render, Query } from '@nestjs/common';

@Controller()
export class PagesController {

    private getPopularProducts() {
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

    private getAllProducts() {
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

    private getRecommendedProducts() {
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

    @Get()
    @Render('pages/index')
    getIndexPage(@Query('auth') auth?: string) {
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

    @Get('catalog')
    @Render('pages/catalog')
    getCatalogPage(@Query('auth') auth?: string) {
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

    @Get('cart')
    @Render('pages/cart')
    getCartPage(@Query('auth') auth?: string) {
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
}