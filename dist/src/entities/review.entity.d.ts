import { User } from './user.entity';
import { Product } from './product.entity';
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    userId: number;
    productId: number;
    createdAt: Date;
    user: User;
    product: Product;
}
