import { CreateProductInput, UpdateProductInput } from '../graphql/create-product.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { ProductsService } from "../products/products.service";
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    products(pagination: PaginationArgs): Promise<{
        items: import("../entities/product.entity").Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    product(id: number): Promise<import("../entities/product.entity").Product>;
    createProduct(data: CreateProductInput): Promise<import("../entities/product.entity").Product>;
    updateProduct(data: UpdateProductInput): Promise<import("../entities/product.entity").Product>;
    deleteProduct(id: number): Promise<import("../entities/product.entity").Product>;
}
