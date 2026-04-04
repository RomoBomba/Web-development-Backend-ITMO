import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { OrderType } from './order.type';
import { ReviewType } from './review.type';

@ObjectType('User')
export class UserType {
    @Field(() => ID)
    id: number;

    @Field()
    email: string;

    @Field({ nullable: true })
    name?: string;

    @Field(() => [OrderType], { nullable: 'itemsAndList' })
    orders?: OrderType[];

    @Field(() => [ReviewType], { nullable: 'itemsAndList' })
    reviews?: ReviewType[];
}