import {Controller, Get, Render, Req, Res} from '@nestjs/common';
import express from 'express';
import Session from 'supertokens-node/recipe/session';
import {ProductsService} from '../products/products.service';
import {UsersService} from '../users/users.service';

@Controller()
export class PagesController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly usersService: UsersService,
    ) {
    }

    private async getSessionInfo(req: express.Request, res: express.Response) {
        console.log('🔍 getSessionInfo called');
        try {
            const session = await Session.getSession(req, res, {sessionRequired: false});
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
                } catch (dbError) {
                    console.log('⚠️ DB error when getting user:', dbError.message);
                }

                return {
                    isAuthenticated: true,
                    userName,
                    userRole: role,
                    userId,
                };
            }
        } catch (error) {
            console.log('❌ No session:', error.message);
        }
        return {isAuthenticated: false, userName: null, userRole: null, userId: null};
    }

    @Get()
    @Render('pages/index')
    async getIndexPage(@Req() req: express.Request, @Res() res: express.Response) {
        console.log('🏠 GET /');
        const sessionInfo = await this.getSessionInfo(req, res);
        console.log('Session info:', sessionInfo);

        const result = await this.productsService.getPopularProducts();
        const products = Array.isArray(result) ? result : (result as any).data || [];

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

    @Get('catalog')
    @Render('pages/catalog')
    async getCatalogPage(@Req() req: express.Request, @Res() res: express.Response) {
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

    @Get('cart')
    @Render('pages/cart')
    async getCartPage(@Req() req: express.Request, @Res() res: express.Response) {
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

    @Get('about')
    @Render('pages/about')
    async getAboutPage(@Req() req: express.Request, @Res() res: express.Response) {
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

    @Get('credit')
    @Render('pages/credit')
    async getCreditPage(@Req() req: express.Request, @Res() res: express.Response) {
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

    @Get('profile')
    @Render('pages/profile')
    async getProfilePage(@Req() req: express.Request, @Res() res: express.Response) {
        const sessionInfo = await this.getSessionInfo(req, res);

        if (!sessionInfo.isAuthenticated) {
            return {redirect: '/login'};
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

    @Get('orders')
    @Render('pages/orders')
    async getOrdersPage(@Req() req: express.Request, @Res() res: express.Response) {
        const sessionInfo = await this.getSessionInfo(req, res);

        if (!sessionInfo.isAuthenticated) {
            return {redirect: '/login'};
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

    @Get('login')
    @Render('pages/login')
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

    @Get('register')
    @Render('pages/register')
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
}