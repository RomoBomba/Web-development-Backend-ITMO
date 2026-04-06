import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, UseGuards, Req } from '@nestjs/common';
import express from 'express';
import {CategoriesService} from './categories.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../common/decorators/roles.decorator";
import Session from "supertokens-node/recipe/session";
import {UsersService} from '../users/users.service';

@Controller('categories')
@UseGuards(RolesGuard)
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly usersService: UsersService,
    ) {
    }

    private async getSessionInfo(req: express.Request) {
        try {
            const session = await Session.getSession(req, req.res as any);
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
        } catch (error) {
            console.log('🔍 getSessionInfo error:', error.message);
        }
        return {isAuthenticated: false, userName: null, userRole: null, userId: null};
    }

    @Get()
    @Roles('admin')
    @Render('categories/index')
    async findAll(@Req() req: express.Request) {
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

    @Get('add')
    @Roles('admin')
    @Render('categories/add')
    async createForm(@Req() req: express.Request) {
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

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res: express.Response) {
        await this.categoriesService.create(createCategoryDto);
        res.redirect('/categories');
    }

    @Get(':id')
    @Render('categories/show')
    async findOne(@Param('id') id: string, @Req() req: express.Request) {
        const sessionInfo = await this.getSessionInfo(req);
        const categoryId = parseInt(id, 10);

        if (isNaN(categoryId)) {
            return {redirect: '/categories'};
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
        } catch (error) {
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

    @Get(':id/edit')
    @Render('categories/edit')
    async editForm(@Param('id') id: string, @Req() req: express.Request) {
        const sessionInfo = await this.getSessionInfo(req);
        const categoryId = parseInt(id, 10);

        if (isNaN(categoryId)) {
            return {redirect: '/categories'};
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
        } catch (error) {
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

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Res() res: express.Response
    ) {
        const categoryId = parseInt(id, 10);

        if (isNaN(categoryId)) {
            return res.redirect('/categories');
        }

        try {
            await this.categoriesService.update(categoryId, updateCategoryDto);
            res.redirect('/categories');
        } catch (error) {
            res.redirect(`/categories/${categoryId}/edit`);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: express.Response) {
        const categoryId = parseInt(id, 10);

        if (isNaN(categoryId)) {
            return res.redirect('/categories');
        }

        try {
            await this.categoriesService.remove(categoryId);
            res.redirect('/categories');
        } catch (error) {
            res.redirect('/categories');
        }
    }
}