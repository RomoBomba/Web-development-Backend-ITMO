import { CreateOrderInput, UpdateOrderInput } from '../graphql/create-order.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { OrdersService } from "../orders/orders.service";
export declare class OrdersResolver {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    orders(pagination: PaginationArgs): Promise<{
        items: import("../entities/order.entity").Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    order(id: number): Promise<import("../entities/order.entity").Order>;
    createOrder(data: CreateOrderInput): Promise<import("../entities/order.entity").Order>;
    updateOrder(data: UpdateOrderInput): Promise<import("../entities/order.entity").Order>;
    deleteOrder(id: number): Promise<import("../entities/order.entity").Order>;
    userOrders(userId: number): Promise<{
        data: import("../entities/order.entity").Order[];
        meta: {
            userId: number;
            total: number;
        };
    }>;
}
