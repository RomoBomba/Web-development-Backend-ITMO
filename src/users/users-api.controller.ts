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
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

@ApiTags('users')
@Controller('api/users')
export class UsersApiController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Создать нового пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь создан', type: User })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiResponse({ status: 409, description: 'Пользователь уже существует' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список пользователей (с пагинацией)' })
    @ApiResponse({ status: 200, description: 'Список пользователей', type: [User] })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.usersService.findAllPaginated(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить пользователя по ID' })
    @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 200, description: 'Пользователь найден', type: User })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить пользователя' })
    @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 200, description: 'Пользователь обновлен', type: User })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить пользователя' })
    @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 204, description: 'Пользователь удален' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Get('email/:email')
    @ApiOperation({ summary: 'Найти пользователя по email' })
    @ApiParam({ name: 'email', description: 'Email пользователя', example: 'user@example.com' })
    @ApiResponse({ status: 200, description: 'Пользователь найден', type: User })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    findByEmail(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Get(':id/orders')
    @ApiOperation({ summary: 'Получить заказы пользователя' })
    @ApiParam({ name: 'id', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 200, description: 'Список заказов пользователя', type: [Order] })
    findOrders(@Param('id') id: string) {
        return this.usersService.findOrders(+id);
    }
}