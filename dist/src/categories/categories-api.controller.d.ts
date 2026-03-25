import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
export declare class CategoriesApiController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Category[];
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
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<Category>;
    findProducts(id: string): Promise<{
        data: Product[];
        meta: {
            categoryId: number;
            total: number;
        };
    }>;
}
