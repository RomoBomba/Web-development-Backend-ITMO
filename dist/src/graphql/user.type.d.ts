import { OrderType } from './order.type';
import { ReviewType } from './review.type';
export declare class UserType {
    id: number;
    email: string;
    name?: string;
    orders?: OrderType[];
    reviews?: ReviewType[];
}
