import express from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<{
        categories: import("../entities/category.entity").Category[];
        title: string;
        metaKeywords: string;
        metaDescription: string;
        currentPage: string;
        cartCount: number;
        isAuthenticated: boolean;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
    }>;
    createForm(): {
        title: string;
        metaKeywords: string;
        metaDescription: string;
        currentPage: string;
        cartCount: number;
        isAuthenticated: boolean;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
    };
    create(createCategoryDto: CreateCategoryDto, res: express.Response): Promise<void>;
    findOne(id: string): Promise<{
        redirect: string;
        category?: undefined;
        title?: undefined;
        metaKeywords?: undefined;
        metaDescription?: undefined;
        currentPage?: undefined;
        cartCount?: undefined;
        isAuthenticated?: undefined;
        useSwiper?: undefined;
        useInputMask?: undefined;
        pageScript?: undefined;
    } | {
        category: import("../entities/category.entity").Category;
        title: string;
        metaKeywords: string;
        metaDescription: string;
        currentPage: string;
        cartCount: number;
        isAuthenticated: boolean;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
        redirect?: undefined;
    } | {
        category: null;
        title: string;
        currentPage: string;
        cartCount: number;
        isAuthenticated: boolean;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
        redirect?: undefined;
        metaKeywords?: undefined;
        metaDescription?: undefined;
    }>;
    editForm(id: string): Promise<{
        redirect: string;
        category?: undefined;
        title?: undefined;
        metaKeywords?: undefined;
        metaDescription?: undefined;
        currentPage?: undefined;
        cartCount?: undefined;
        isAuthenticated?: undefined;
        useSwiper?: undefined;
        useInputMask?: undefined;
        pageScript?: undefined;
    } | {
        category: import("../entities/category.entity").Category;
        title: string;
        metaKeywords: string;
        metaDescription: string;
        currentPage: string;
        cartCount: number;
        isAuthenticated: boolean;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
        redirect?: undefined;
    } | {
        category: null;
        title: string;
        currentPage: string;
        cartCount: number;
        isAuthenticated: boolean;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
        redirect?: undefined;
        metaKeywords?: undefined;
        metaDescription?: undefined;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, res: express.Response): Promise<void>;
    remove(id: string, res: express.Response): Promise<void>;
}
