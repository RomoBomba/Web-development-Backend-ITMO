import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryType } from '../graphql/category.type';
import { CreateCategoryInput, UpdateCategoryInput } from '../graphql/create-category.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { Paginated } from '../graphql/pagination.type';
import {CategoriesService} from "../categories/categories.service";
import {ProductType} from "./product.type";

const PaginatedCategory = Paginated(CategoryType);

@Resolver(() => CategoryType)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query(() => PaginatedCategory)
    async categories(@Args() pagination: PaginationArgs) {
        return this.categoriesService.findAllPaginatedGraphQL(pagination);
    }

    @Query(() => CategoryType)
    async category(@Args('id', { type: () => Int }) id: number) {
        return this.categoriesService.findOne(id);
    }

    @Mutation(() => CategoryType)
    async createCategory(@Args('data') data: CreateCategoryInput) {
        return this.categoriesService.create(data);
    }

    @Mutation(() => CategoryType)
    async updateCategory(@Args('data') data: UpdateCategoryInput) {
        return this.categoriesService.update(data.id, data);
    }

    @Mutation(() => CategoryType)
    async deleteCategory(@Args('id', { type: () => Int }) id: number) {
        return this.categoriesService.remove(id);
    }

    @Query(() => [ProductType])
    async categoryProducts(@Args('categoryId', { type: () => Int }) categoryId: number) {
        const result = await this.categoriesService.findProducts(categoryId);
        return result.data;
    }
}