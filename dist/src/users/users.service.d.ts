import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findAllPaginated(paginationDto: PaginationDto): Promise<{
        data: User[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        links: {
            self: string;
            first: string;
            previous: string | null;
            next: string | null;
            last: string;
        };
    }>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findOrders(userId: number): Promise<import("../entities/order.entity").Order[]>;
    findAllPaginatedGraphQL(paginationDto: PaginationDto): Promise<{
        items: User[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
}
