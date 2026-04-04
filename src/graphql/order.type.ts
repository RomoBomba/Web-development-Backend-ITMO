import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { UserType } from './user.type';
import { ProductType } from './product.type';

@ObjectType('OrderItem')
export class OrderItemType {
    @Field(() => ID)
    id: number;

    @Field(() => ProductType)
    product: ProductType;

    @Field()
    quantity: number;

    @Field(() => Float)
    price: number;
}

@ObjectType('Order')
export class OrderType {
    @Field(() => ID)
    id: number;

    @Field(() => UserType)
    user: UserType;

    @Field(() => [OrderItemType])
    items: OrderItemType[];

    @Field(() => Float)
    total: number;

    @Field()
    status: string;
}