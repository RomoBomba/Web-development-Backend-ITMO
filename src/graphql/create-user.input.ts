import { InputType, Field, ID } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class CreateUserInput {
    @Field()
    email: string;

    @Field({ nullable: true })
    name?: string;

    @Field()
    password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => ID)
    id: number;
}