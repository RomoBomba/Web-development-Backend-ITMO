import { OnModuleDestroy } from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController implements OnModuleDestroy {
    private readonly productsService;
    private productCreatedSubject;
    private productUpdatedSubject;
    private productDeletedSubject;
    private destroy$;
    constructor(productsService: ProductsService);
    events(): Observable<{
        data: string;
    }>;
    onModuleDestroy(): void;
    findAll(): Promise<{
        products: import("../entities/product.entity").Product[];
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
    create(createProductDto: CreateProductDto, res: Response): Promise<void>;
    findOne(id: string): Promise<{
        redirect: string;
        product?: undefined;
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
        product: import("../entities/product.entity").Product;
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
        product: null;
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
        product?: undefined;
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
        product: import("../entities/product.entity").Product;
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
        product: null;
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
    update(id: string, updateProductDto: UpdateProductDto, res: Response): Promise<void>;
    remove(id: string, res: Response): Promise<void>;
}
