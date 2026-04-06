import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private readonly logger;
    constructor(usersService: UsersService);
    getUserByEmail(email: string): Promise<import("../entities/user.entity").User | null>;
    getUserBySupertokensId(supertokensUserId: string): Promise<import("../entities/user.entity").User | null>;
    findOrCreateUserFromSupertokens(supertokensUserId: string, email: string): Promise<import("../entities/user.entity").User>;
}
