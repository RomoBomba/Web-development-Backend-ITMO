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
import {ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
import { Order } from '../entities/order.entity';
import {Public} from "../common/decorators/public.decorator";
import {Roles} from "../common/decorators/roles.decorator";

@ApiTags('orders')
@ApiBearerAuth()
@Controller('api/orders')
export class OrdersApiController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @Roles('admin')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Создать новый заказ' })
    @ApiResponse({ status: 201, description: 'Заказ создан', type: Order })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Получить список заказов (с пагинацией)' })
    @ApiResponse({ status: 200, description: 'Список заказов', type: [Order] })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.ordersService.findAllPaginated(paginationDto);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Получить заказ по ID' })
    @ApiParam({ name: 'id', description: 'ID заказа', example: 1 })
    @ApiResponse({ status: 200, description: 'Заказ найден', type: Order })
    @ApiResponse({ status: 404, description: 'Заказ не найден' })
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Patch(':id')
    @Roles('admin')
    @ApiOperation({ summary: 'Обновить заказ' })
    @ApiParam({ name: 'id', description: 'ID заказа', example: 1 })
    @ApiResponse({ status: 200, description: 'Заказ обновлен', type: Order })
    @ApiResponse({ status: 404, description: 'Заказ не найден' })
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }

    @Delete(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить заказ' })
    @ApiParam({ name: 'id', description: 'ID заказа', example: 1 })
    @ApiResponse({ status: 204, description: 'Заказ удален' })
    @ApiResponse({ status: 404, description: 'Заказ не найден' })
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }

    @Get('user/:userId')
    @Public()
    @ApiOperation({ summary: 'Получить заказы пользователя' })
    @ApiParam({ name: 'userId', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 200, description: 'Список заказов пользователя', type: [Order] })
    findByUser(@Param('userId') userId: string) {
        return this.ordersService.findByUser(+userId);
    }
}