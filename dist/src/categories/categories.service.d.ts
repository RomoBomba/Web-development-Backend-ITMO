import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
export declare class CategoriesService {
    private categoryRepository;
    private productRepository;
    constructor(categoryRepository: Repository<Category>, productRepository: Repository<Product>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findAllPaginated(paginationDto: PaginationDto): Promise<{
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
    findOne(id: number): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: number): Promise<Category>;
    findProducts(categoryId: number): Promise<{
        data: Product[];
        meta: {
            categoryId: number;
            total: number;
        };
    }>;
}
