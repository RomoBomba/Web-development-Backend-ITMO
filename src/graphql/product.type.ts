import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { CategoryType } from './category.type';
import { ReviewType } from './review.type';

@ObjectType('Product')
export class ProductType {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Float)
    price: number;

    @Field({ nullable: true })
    image?: string;

    @Field(() => CategoryType, { nullable: true })
    category?: CategoryType;

    @Field(() => [ReviewType], { nullable: 'itemsAndList' })
    reviews?: ReviewType[];
}