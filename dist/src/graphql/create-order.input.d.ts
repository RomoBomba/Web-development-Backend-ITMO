declare class OrderItemInput {
    productId: number;
    quantity: number;
    price: number;
}
export declare class CreateOrderInput {
    userId: number;
    total: number;
    status?: string;
    items: OrderItemInput[];
}
declare const UpdateOrderInput_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderInput>>;
export declare class UpdateOrderInput extends UpdateOrderInput_base {
    id: number;
}
export {};
