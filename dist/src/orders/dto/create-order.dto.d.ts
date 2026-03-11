export declare class OrderItemDto {
    productId: number;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    userId: number;
    total: number;
    status?: string;
    items: OrderItemDto[];
}
