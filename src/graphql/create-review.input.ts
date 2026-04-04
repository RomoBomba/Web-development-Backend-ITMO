import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class CreateReviewInput {
    @Field(() => Int)
    rating: number;

    @Field({ nullable: true })
    comment?: string;

    @Field()
    userId: number;

    @Field()
    productId: number;
}

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
    @Field(() => ID)
    id: number;
}