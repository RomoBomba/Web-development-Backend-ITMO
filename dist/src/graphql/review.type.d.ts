import { UserType } from './user.type';
import { ProductType } from './product.type';
export declare class ReviewType {
    id: number;
    rating: number;
    comment?: string;
    user: UserType;
    product: ProductType;
}
