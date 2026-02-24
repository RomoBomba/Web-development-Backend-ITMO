import { Category } from './category.entity';
import { OrderItem } from './order-item.entity';
import { Review } from './review.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    orderItems: OrderItem[];
    reviews: Review[];
}
