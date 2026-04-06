import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Product } from '../entities/product.entity';
import { StorageService } from "../storage/storage.service";
export declare class ProductsApiController {
    private readonly productsService;
    private readonly storageService;
    constructor(productsService: ProductsService, storageService: StorageService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Product[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        links: {
            self: string;
            first: string;
            previous: string | null;
            next: string | null;
            last: string;
        };
    }>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
    findByCategory(categoryId: string): Promise<{
        data: Product[];
        meta: {
            categoryId: number;
            total: number;
        };
    }>;
    uploadImage(file: Express.Multer.File): Promise<{
        success: boolean;
        key: string;
        url: string;
        message: string;
    }>;
}
