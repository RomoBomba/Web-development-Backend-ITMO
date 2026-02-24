export declare class PagesController {
    private getPopularProducts;
    private getAllProducts;
    private getRecommendedProducts;
    getIndexPage(auth?: string): {
        title: string;
        metaKeywords: string;
        metaDescription: string;
        isAuthenticated: boolean;
        products: {
            id: string;
            name: string;
            currentPrice: number;
            oldPrice: number;
            image: string;
            description: string;
            caption: string;
        }[];
        cartCount: number;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: string;
        currentPage: string;
    };
    getCatalogPage(auth?: string): {
        title: string;
        metaKeywords: string;
        metaDescription: string;
        isAuthenticated: boolean;
        allProducts: ({
            id: string;
            name: string;
            currentPrice: number;
            oldPrice: number;
            image: string;
            description: string;
            caption: string;
        } | {
            id: string;
            name: string;
            currentPrice: number;
            image: string;
            description: string;
        })[];
        cartCount: number;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: string;
        currentPage: string;
    };
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
    getCartPage(auth?: string): {
        title: string;
        metaKeywords: string;
        metaDescription: string;
        isAuthenticated: boolean;
        cartItemsCount: number;
        recommendedProducts: {
            id: string;
            name: string;
            currentPrice: number;
            image: string;
            description: string;
        }[];
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: string;
        currentPage: string;
    };
}
