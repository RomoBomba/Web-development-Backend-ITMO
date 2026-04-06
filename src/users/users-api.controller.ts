import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus, Render,
} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import {Roles} from "../common/decorators/roles.decorator";
import {Public} from "../common/decorators/public.decorator";

@ApiTags('users')
@ApiBearerAuth()
@Controller('api/users')
export class UsersApiController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @Roles('admin')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Создать нового пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь создан', type: User })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiResponse({ status: 409, description: 'Пользователь уже существует' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Получить список пользователей (с пагинацией)' })
    @ApiResponse({ status: 200, description: 'Список пользователей', type: [User] })
    @Get()
    @Roles('admin')
    @Render('users/index')
    async findAll() {
        const users = await this.usersService.findAll();
        return {
            users,
            title: 'Управление пользователями',
            metaKeywords: 'управление пользователями, администрирование',
            metaDescription: 'Панель управления пользователями магазина MusicStore',
            currentPage: 'users',
            cartCount: 0,
            isAuthenticated: true,
            useSwiper: false,
            useInputMask: false,
            pageScript: null
        };
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Получить пользователя по ID' })
    @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 200, description: 'Пользователь найден', type: User })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    @Roles('admin')
    @ApiOperation({ summary: 'Обновить пользователя' })
    @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 200, description: 'Пользователь обновлен', type: User })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить пользователя' })
    @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 204, description: 'Пользователь удален' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Get('email/:email')
    @Public()
    @ApiOperation({ summary: 'Найти пользователя по email' })
    @ApiParam({ name: 'email', description: 'Email пользователя', example: 'user@example.com' })
    @ApiResponse({ status: 200, description: 'Пользователь найден', type: User })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    findByEmail(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Get(':id/orders')
    @Public()
    @ApiOperation({ summary: 'Получить заказы пользователя' })
    @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 200, description: 'Список заказов пользователя', type: [Order] })
    findOrders(@Param('id') id: string) {
        return this.usersService.findOrders(+id);
    }
}