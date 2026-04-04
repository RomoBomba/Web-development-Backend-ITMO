import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductType } from './product.type';

@ObjectType('Category')
export class CategoryType {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field(() => [ProductType], { nullable: 'itemsAndList' })
    products?: ProductType[];
}