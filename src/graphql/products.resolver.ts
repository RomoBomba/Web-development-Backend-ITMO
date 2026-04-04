import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductType } from '../graphql/product.type';
import { CreateProductInput, UpdateProductInput } from '../graphql/create-product.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { Paginated } from '../graphql/pagination.type';
import {ProductsService} from "../products/products.service";

const PaginatedProduct = Paginated(ProductType);

@Resolver(() => ProductType)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => PaginatedProduct)
    async products(@Args() pagination: PaginationArgs) {
        return this.productsService.findAllPaginatedGraphQL(pagination);
    }

    @Query(() => ProductType)
    async product(@Args('id', { type: () => Int }) id: number) {
        return this.productsService.findOne(id);
    }

    @Mutation(() => ProductType)
    async createProduct(@Args('data') data: CreateProductInput) {
        return this.productsService.create(data);
    }

    @Mutation(() => ProductType)
    async updateProduct(@Args('data') data: UpdateProductInput) {
        return this.productsService.update(data.id, data);
    }

    @Mutation(() => ProductType)
    async deleteProduct(@Args('id', { type: () => Int }) id: number) {
        return this.productsService.remove(id);
    }
}