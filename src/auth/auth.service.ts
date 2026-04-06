import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private usersService: UsersService) {}

    async getUserByEmail(email: string) {
        try {
            return await this.usersService.findByEmail(email);
        } catch {
            return null;
        }
    }

    async getUserBySupertokensId(supertokensUserId: string) {
        try {
            return await this.usersService.findBySupertokensId(supertokensUserId);
        } catch {
            return null;
        }
    }

    async findOrCreateUserFromSupertokens(supertokensUserId: string, email: string) {
        let user = await this.usersService.findBySupertokensId(supertokensUserId);
        if (!user) {
            const role = email.includes('admin') ? 'admin' : 'user';
            user = await this.usersService.create({
                email,
                name: email.split('@')[0],
                password: '',
                supertokensUserId,
                role,
            } as CreateUserDto);
        }
        return user;
    }
}