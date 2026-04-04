import {InputType, Field, Float, ID} from '@nestjs/graphql';
import {PartialType} from "@nestjs/swagger";

@InputType()
export class CreateProductInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Float)
    price: number;

    @Field({ nullable: true })
    image?: string;

    @Field()
    categoryId: number;
}

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
    @Field(() => ID)
    id: number;
}