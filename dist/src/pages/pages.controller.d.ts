import { ProductsService } from '../products/products.service';
export declare class PagesController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getIndexPage(auth?: string): Promise<{
        title: string;
        metaKeywords: string;
        metaDescription: string;
        isAuthenticated: boolean;
        products: import("../entities/product.entity").Product[];
        cartCount: number;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: string;
        currentPage: string;
    }>;
    getCatalogPage(auth?: string): Promise<{
        title: string;
        metaKeywords: string;
        metaDescription: string;
        isAuthenticated: boolean;
        allProducts: import("../entities/product.entity").Product[];
        cartCount: number;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: string;
        currentPage: string;
    }>;
    getCartPage(auth?: string): Promise<{
        title: string;
        metaKeywords: string;
        metaDescription: string;
        isAuthenticated: boolean;
        cartItemsCount: number;
        recommendedProducts: import("../entities/product.entity").Product[];
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: string;
        currentPage: string;
    }>;
    getAboutPage(auth?: string): {
        title: string;
        metaKeywords: string;
        metaDescription: string;
        isAuthenticated: boolean;
        cartCount: number;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: string;
        currentPage: string;
    };
    getCreditPage(auth?: string): {
        title: string;
        metaKeywords: string;
        metaDescription: string;
        isAuthenticated: boolean;
        cartCount: number;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: string;
        currentPage: string;
    };
}
