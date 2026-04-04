import { CreateCategoryInput, UpdateCategoryInput } from '../graphql/create-category.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { CategoriesService } from "../categories/categories.service";
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    categories(pagination: PaginationArgs): Promise<{
        items: import("../entities/category.entity").Category[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    category(id: number): Promise<import("../entities/category.entity").Category>;
    createCategory(data: CreateCategoryInput): Promise<import("../entities/category.entity").Category>;
    updateCategory(data: UpdateCategoryInput): Promise<import("../entities/category.entity").Category>;
    deleteCategory(id: number): Promise<import("../entities/category.entity").Category>;
    categoryProducts(categoryId: number): Promise<import("../entities/product.entity").Product[]>;
}
