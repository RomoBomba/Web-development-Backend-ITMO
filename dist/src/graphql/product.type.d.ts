import { CategoryType } from './category.type';
import { ReviewType } from './review.type';
export declare class ProductType {
    id: number;
    name: string;
    description?: string;
    price: number;
    image?: string;
    category?: CategoryType;
    reviews?: ReviewType[];
}
