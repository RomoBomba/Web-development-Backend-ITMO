import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
export declare class UsersApiController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<{
        users: User[];
        title: string;
        metaKeywords: string;
        metaDescription: string;
        currentPage: string;
        cartCount: number;
        isAuthenticated: boolean;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
    }>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findOrders(id: string): Promise<Order[]>;
}
