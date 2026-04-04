import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function Paginated<T>(classRef: Type<T>): any {
    @ObjectType(`${classRef.name}Connection`)
    abstract class PaginatedType {
        @Field(() => [classRef], { nullable: 'itemsAndList' })
        items: T[];

        @Field(() => Int)
        total: number;

        @Field(() => Int)
        page: number;

        @Field(() => Int)
        limit: number;

        @Field(() => Int)
        totalPages: number;

        @Field({ nullable: true })
        hasNextPage: boolean;

        @Field({ nullable: true })
        hasPreviousPage: boolean;
    }
    return PaginatedType;
}