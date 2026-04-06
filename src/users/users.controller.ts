import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Render,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import express from 'express';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Roles} from "../common/decorators/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import Session from "supertokens-node/recipe/session";

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    private async getSessionInfo(req: express.Request, res: express.Response) {
        try {
            const session = await Session.getSession(req, res);
            if (session) {
                const payload = session.getAccessTokenPayload();
                const userId = session.getUserId();
                const user = await this.usersService.findBySupertokensId(userId);
                return {
                    isAuthenticated: true,
                    userName: user?.name || 'Пользователь',
                    userRole: payload.role || user?.role || 'user',
                    userId,
                };
            }
        } catch (error) {
            console.log('getSessionInfo error:', error.message);
        }
        return {isAuthenticated: false, userName: null, userRole: null, userId: null};
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles('admin')
    @Render('users/index')
    async findAll(@Req() req: express.Request, @Res() res: express.Response) {
        const sessionInfo = await this.getSessionInfo(req, res);
        const users = await this.usersService.findAll();
        return {
            users,
            ...sessionInfo,
            title: 'Управление пользователями',
            metaKeywords: 'управление пользователями, администрирование',
            metaDescription: 'Панель управления пользователями магазина MusicStore',
            currentPage: 'users',
            cartCount: 0,
            useSwiper: false,
            useInputMask: false,
            pageScript: null
        };
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}