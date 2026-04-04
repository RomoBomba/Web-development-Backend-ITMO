import { CreateUserInput, UpdateUserInput } from '../graphql/create-user.input';
import { PaginationArgs } from '../graphql/pagination.args';
import { UsersService } from "../users/users.service";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    users(pagination: PaginationArgs): Promise<{
        items: import("../entities/user.entity").User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
    user(id: number): Promise<import("../entities/user.entity").User>;
    userByEmail(email: string): Promise<import("../entities/user.entity").User>;
    createUser(data: CreateUserInput): Promise<import("../entities/user.entity").User>;
    updateUser(data: UpdateUserInput): Promise<import("../entities/user.entity").User>;
    deleteUser(id: number): Promise<import("../entities/user.entity").User>;
    userOrders(userId: number): Promise<import("../entities/order.entity").Order[]>;
}
