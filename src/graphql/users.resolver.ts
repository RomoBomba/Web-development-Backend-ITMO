import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserType } from '../graphql/user.type';
import { CreateUserInput, UpdateUserInput } from '../graphql/create-user.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { Paginated } from '../graphql/pagination.type';
import {UsersService} from "../users/users.service";
import {OrderType} from "./order.type";

const PaginatedUser = Paginated(UserType);

@Resolver(() => UserType)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => PaginatedUser)
    async users(@Args() pagination: PaginationArgs) {
        return this.usersService.findAllPaginatedGraphQL(pagination);
    }

    @Query(() => UserType)
    async user(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.findOne(id);
    }

    @Query(() => UserType)
    async userByEmail(@Args('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Mutation(() => UserType)
    async createUser(@Args('data') data: CreateUserInput) {
        return this.usersService.create(data);
    }

    @Mutation(() => UserType)
    async updateUser(@Args('data') data: UpdateUserInput) {
        return this.usersService.update(data.id, data);
    }

    @Mutation(() => UserType)
    async deleteUser(@Args('id', { type: () => Int }) id: number) {
        return this.usersService.remove(id);
    }

    @Query(() => [OrderType])
    async userOrders(@Args('userId', { type: () => Int }) userId: number) {
        return this.usersService.findOrders(userId);
    }
}