import { InputType, Field, ID } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class CreateCategoryInput {
    @Field()
    name: string;
}

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
    @Field(() => ID)
    id: number;
}