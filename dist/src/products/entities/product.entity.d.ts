import { OrderItem } from '../../entities/order-item.entity';
import { Category } from "../../entities/category.entity";
import { Review } from "../../entities/review.entity";
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
