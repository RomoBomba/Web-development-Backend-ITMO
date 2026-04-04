import { UserType } from './user.type';
import { ProductType } from './product.type';
export declare class OrderItemType {
    id: number;
    product: ProductType;
    quantity: number;
    price: number;
}
export declare class OrderType {
    id: number;
    user: UserType;
    items: OrderItemType[];
    total: number;
    status: string;
}
