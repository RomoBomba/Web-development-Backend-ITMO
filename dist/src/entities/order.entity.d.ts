import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
export declare class Order {
    id: number;
    userId: number;
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    orderItems: OrderItem[];
}
