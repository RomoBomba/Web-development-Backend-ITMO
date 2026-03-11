
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, OnModuleDestroy } from '@nestjs/common';
import type { Response } from 'express';
import { Subject, merge, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

interface ProductEvent {
    id: number;
    name: string;
    price?: number;
    message: string;
    timestamp: string;
    type: 'product_created' | 'product_updated' | 'product_deleted';
}

@Controller('products')
export class ProductsController implements OnModuleDestroy {
    private productCreatedSubject = new Subject<ProductEvent>();
    private productUpdatedSubject = new Subject<ProductEvent>();
    private productDeletedSubject = new Subject<ProductEvent>();
    private destroy$ = new Subject<void>();

    constructor(private readonly productsService: ProductsService) {}

    @Get('events')
    events(): Observable<{ data: string }> {
        return merge(
            this.productCreatedSubject.pipe(
                takeUntil(this.destroy$),
                map((product): { data: string } => ({
                    data: JSON.stringify({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        message: `Новый товар: ${product.name}`,
                        timestamp: new Date().toISOString(),
                        type: 'product_created'
                    })
                }))
            ),
            this.productUpdatedSubject.pipe(
                takeUntil(this.destroy$),
                map((product): { data: string } => ({
                    data: JSON.stringify({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        message: `Товар обновлен: ${product.name}`,
                        timestamp: new Date().toISOString(),
                        type: 'product_updated'
                    })
                }))
            ),
            this.productDeletedSubject.pipe(
                takeUntil(this.destroy$),
                map((product): { data: string } => ({
                    data: JSON.stringify({
                        id: product.id,
                        name: product.name,
                        message: `Товар удален: ${product.name}`,
                        timestamp: new Date().toISOString(),
                        type: 'product_deleted'
                    })
                }))
            )
        );
    }

    onModuleDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.productCreatedSubject.complete();
        this.productUpdatedSubject.complete();
        this.productDeletedSubject.complete();
    }

    @Get()
    @Render('products/index')
    async findAll() {
        const products = await this.productsService.findAll();
        return {
            products,
            title: 'Управление товарами',
            metaKeywords: 'управление товарами, администрирование, MusicStore',
            metaDescription: 'Панель управления товарами магазина MusicStore',
            currentPage: 'products',
            cartCount: 0,
            isAuthenticated: true,
            useSwiper: false,
            useInputMask: false,
            pageScript: null
        };
    }

    @Get('add')
    @Render('products/add')
    createForm() {
        return {
            title: 'Добавить товар',
            metaKeywords: 'добавить товар, новый товар, MusicStore',
            metaDescription: 'Добавление нового товара в каталог MusicStore',
            currentPage: 'products',
            cartCount: 0,
            isAuthenticated: true,
            useSwiper: false,
            useInputMask: false,
            pageScript: null
        };
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
        try {
            const newProduct = await this.productsService.create(createProductDto);

            console.log('✅ Товар создан:', newProduct.id);

            this.productCreatedSubject.next({
                id: newProduct.id,
                name: newProduct.name,
                price: newProduct.price,
                message: `Создан новый товар: ${newProduct.name}`,
                timestamp: new Date().toISOString(),
                type: 'product_created'
            });

            res.redirect('/products');
        } catch (error) {
            console.error('Ошибка создания:', error);
            res.redirect('/products/add');
        }
    }

    @Get(':id')
    @Render('products/show')
    async findOne(@Param('id') id: string) {
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return { redirect: '/products' };
        }

        try {
            const product = await this.productsService.findOne(productId);

            if (!product) {
                return { redirect: '/products' };
            }

            return {
                product,
                title: product.name,
                metaKeywords: `${product.name}, купить, MusicStore`,
                metaDescription: product.description || `Купить ${product.name} в MusicStore`,
                currentPage: 'products',
                cartCount: 0,
                isAuthenticated: true,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        } catch (error) {
            console.error(`Ошибка поиска товара ${productId}:`, error);
            return {
                product: null,
                title: 'Товар не найден',
                currentPage: 'products',
                cartCount: 0,
                isAuthenticated: true,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        }
    }

    @Get(':id/edit')
    @Render('products/edit')
    async editForm(@Param('id') id: string) {
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return { redirect: '/products' };
        }

        try {
            const product = await this.productsService.findOne(productId);

            if (!product) {
                return { redirect: '/products' };
            }

            return {
                product,
                title: `Редактировать: ${product.name}`,
                metaKeywords: 'редактировать товар, MusicStore',
                metaDescription: `Редактирование товара ${product.name}`,
                currentPage: 'products',
                cartCount: 0,
                isAuthenticated: true,
                useSwiper: false,
                useInputMask: false,
                pageScript: null
            };
        } catch (error) {
            console.error(`Ошибка поиска товара ${productId}:`, error);
            return {
                product: null,
                title: 'Товар не найден',
                currentPage: 'products',
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
        @Body() updateProductDto: UpdateProductDto,
        @Res() res: Response
    ) {
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return res.redirect('/products');
        }

        try {
            const updatedProduct = await this.productsService.update(productId, updateProductDto);

            if (!updatedProduct) {
                return res.redirect('/products');
            }

            console.log('Товар обновлен:', productId);

            this.productUpdatedSubject.next({
                id: updatedProduct.id,
                name: updatedProduct.name,
                price: updatedProduct.price,
                message: `Товар обновлен: ${updatedProduct.name}`,
                timestamp: new Date().toISOString(),
                type: 'product_updated'
            });

            res.redirect('/products');
        } catch (error) {
            console.error(`Ошибка обновления ${productId}:`, error);
            res.redirect(`/products/${productId}/edit`);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return res.redirect('/products');
        }

        try {
            let productName = 'Товар';
            try {
                const product = await this.productsService.findOne(productId);
                productName = product?.name || `Товар #${productId}`;
            } catch {
                productName = `Товар #${productId}`;
            }

            await this.productsService.remove(productId);

            console.log('✅ Товар удален:', productId);

            this.productDeletedSubject.next({
                id: productId,
                name: productName,
                message: `Товар удален: ${productName}`,
                timestamp: new Date().toISOString(),
                type: 'product_deleted'
            });

            res.redirect('/products');
        } catch (error) {
            console.error(`Ошибка удаления ${productId}:`, error);
            res.redirect('/products');
        }
    }
}