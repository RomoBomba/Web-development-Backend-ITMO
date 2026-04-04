import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from './user.type';
import { ProductType } from './product.type';

@ObjectType('Review')
export class ReviewType {
    @Field(() => ID)
    id: number;

    @Field()
    rating: number;

    @Field({ nullable: true })
    comment?: string;

    @Field(() => UserType)
    user: UserType;

    @Field(() => ProductType)
    product: ProductType;
}