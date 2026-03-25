import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import express from 'express';
import {CategoriesService} from './categories.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
    }

    @Get()
    @Render('categories/index')
    async findAll() {
        const categories = await this.categoriesService.findAll();
        return {
            categories,
            title: 'Управление категориями',
            metaKeywords: 'управление категориями, администрирование',
            metaDescription: 'Панель управления категориями магазина MusicStore',
            currentPage: 'categories',
            cartCount: 0,
            isAuthenticated: true,
            useSwiper: false,
            useInputMask: false,
            pageScript: null
        };
    }

    @Get('add')
    @Render('categories/add')
    createForm() {
        return {
            title: 'Добавить категорию',
            metaKeywords: 'добавить категорию, новая категория',
            metaDescription: 'Добавление новой категории в каталог MusicStore',
            currentPage: 'categories',
            cartCount: 0,
            isAuthenticated: true,
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
    async findOne(@Param('id') id: string) {
        const categoryId = parseInt(id, 10);

        if (isNaN(categoryId)) {
            return {redirect: '/categories'};
        }

        try {
            const category = await this.categoriesService.findOne(categoryId);
            return {
                category,
                title: category.name,
                metaKeywords: `${category.name}, категория, MusicStore`,
                metaDescription: `Категория ${category.name} в магазине MusicStore`,
                currentPage: 'categories',
                cartCount: 0,
                isAuthenticated: true,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        } catch (error) {
            return {
                category: null,
                title: 'Категория не найдена',
                currentPage: 'categories',
                cartCount: 0,
                isAuthenticated: true,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
    }

    @Get(':id/edit')
    @Render('categories/edit')
    async editForm(@Param('id') id: string) {
        const categoryId = parseInt(id, 10);

        if (isNaN(categoryId)) {
            return {redirect: '/categories'};
        }

        try {
            const category = await this.categoriesService.findOne(categoryId);
            return {
                category,
                title: `Редактировать: ${category.name}`,
                metaKeywords: 'редактировать категорию',
                metaDescription: `Редактирование категории ${category.name}`,
                currentPage: 'categories',
                cartCount: 0,
                isAuthenticated: true,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        } catch (error) {
            return {
                category: null,
                title: 'Категория не найдена',
                currentPage: 'categories',
                cartCount: 0,
                isAuthenticated: true,
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