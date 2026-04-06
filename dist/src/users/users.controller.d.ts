import express from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    private getSessionInfo;
    create(createUserDto: CreateUserDto): Promise<import("../entities/user.entity").User>;
    findAll(req: express.Request, res: express.Response): Promise<{
        title: string;
        metaKeywords: string;
        metaDescription: string;
        currentPage: string;
        cartCount: number;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
        isAuthenticated: boolean;
        userName: string;
        userRole: any;
        userId: string;
        users: import("../entities/user.entity").User[];
    } | {
        title: string;
        metaKeywords: string;
        metaDescription: string;
        currentPage: string;
        cartCount: number;
        useSwiper: boolean;
        useInputMask: boolean;
        pageScript: null;
        isAuthenticated: boolean;
        userName: null;
        userRole: null;
        userId: null;
        users: import("../entities/user.entity").User[];
    }>;
    findOne(id: string): Promise<import("../entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    remove(id: string): Promise<import("../entities/user.entity").User>;
}
