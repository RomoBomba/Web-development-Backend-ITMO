import { InputType, Field, ID, Float } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
class OrderItemInput {
    @Field()
    productId: number;

    @Field()
    quantity: number;

    @Field(() => Float)
    price: number;
}

@InputType()
export class CreateOrderInput {
    @Field()
    userId: number;

    @Field(() => Float)
    total: number;

    @Field({ nullable: true, defaultValue: 'pending' })
    status?: string;

    @Field(() => [OrderItemInput])
    items: OrderItemInput[];
}

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
    @Field(() => ID)
    id: number;
}