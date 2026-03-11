import { Order } from './order.entity';
import { Review } from './review.entity';
export declare class User {
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    orders: Order[];
    reviews: Review[];
    isAdmin: boolean;
}
