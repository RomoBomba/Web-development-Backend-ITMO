import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderType } from '../graphql/order.type';
import { CreateOrderInput, UpdateOrderInput } from '../graphql/create-order.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { Paginated } from '../graphql/pagination.type';
import {OrdersService} from "../orders/orders.service";

const PaginatedOrder = Paginated(OrderType);

@Resolver(() => OrderType)
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) {}

    @Query(() => PaginatedOrder)
    async orders(@Args() pagination: PaginationArgs) {
        return this.ordersService.findAllPaginatedGraphQL(pagination);
    }

    @Query(() => OrderType)
    async order(@Args('id', { type: () => Int }) id: number) {
        return this.ordersService.findOne(id);
    }

    @Mutation(() => OrderType)
    async createOrder(@Args('data') data: CreateOrderInput) {
        return this.ordersService.create(data);
    }

    @Mutation(() => OrderType)
    async updateOrder(@Args('data') data: UpdateOrderInput) {
        return this.ordersService.update(data.id, data);
    }

    @Mutation(() => OrderType)
    async deleteOrder(@Args('id', { type: () => Int }) id: number) {
        return this.ordersService.remove(id);
    }

    @Query(() => [OrderType])
    async userOrders(@Args('userId', { type: () => Int }) userId: number) {
        return this.ordersService.findByUser(userId);
    }
}