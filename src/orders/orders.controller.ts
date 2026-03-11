import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    @Render('orders/index')
    async findAll() {
        const orders = await this.ordersService.findAll();
        return { orders };
    }

    @Get('add')
    @Render('orders/add')
    createForm() {
        return {};
    }

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        await this.ordersService.create(createOrderDto);
        return { redirect: '/orders' };
    }

    @Get(':id')
    @Render('orders/show')
    async findOne(@Param('id') id: string) {
        const order = await this.ordersService.findOne(+id);
        return { order };
    }

    @Get(':id/edit')
    @Render('orders/edit')
    async editForm(@Param('id') id: string) {
        const order = await this.ordersService.findOne(+id);
        return { order };
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        await this.ordersService.update(+id, updateOrderDto);
        return { redirect: '/orders' };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.ordersService.remove(+id);
        return { redirect: '/orders' };
    }
}