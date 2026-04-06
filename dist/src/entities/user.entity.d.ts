import { Order } from './order.entity';
import { Review } from './review.entity';
export declare class User {
    id: number;
    email: string;
    name: string | null;
    password: string | null;
    supertokensUserId: string | null;
    createdAt: Date;
    updatedAt: Date;
    orders: Order[];
    reviews: Review[];
    role: string;
}
