import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from '../products/dto/pagination.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
    ) {}

    async create(createOrderDto: CreateOrderDto) {
        const order = this.orderRepository.create({
            userId: createOrderDto.userId,
            total: createOrderDto.total,
            status: createOrderDto.status || 'pending',
        });

        const savedOrder = await this.orderRepository.save(order);

        for (const item of createOrderDto.items) {
            const orderItem = this.orderItemRepository.create({
                orderId: savedOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            });
            await this.orderItemRepository.save(orderItem);
        }

        return await this.findOne(savedOrder.id);
    }

    async findAll() {
        return await this.orderRepository.find({
            relations: ['user', 'orderItems', 'orderItems.product'],
        });
    }

    async findAllPaginated(paginationDto: PaginationDto) {
        const page = paginationDto.page ?? 1;
        const limit = paginationDto.limit ?? 10;
        const skip = (page - 1) * limit;

        const [data, total] = await this.orderRepository.findAndCount({
            relations: ['user', 'orderItems', 'orderItems.product'],
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: { page, limit, total, totalPages },
            links: {
                self: `/api/orders?page=${page}&limit=${limit}`,
                first: `/api/orders?page=1&limit=${limit}`,
                previous: page > 1 ? `/api/orders?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `/api/orders?page=${page + 1}&limit=${limit}` : null,
                last: `/api/orders?page=${totalPages}&limit=${limit}`,
            },
        };
    }

    async findOne(id: number) {
        if (isNaN(id) || id <= 0) {
            throw new NotFoundException(`Некорректный ID заказа: ${id}`);
        }

        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'orderItems', 'orderItems.product'],
        });

        if (!order) {
            throw new NotFoundException(`Заказ #${id} не найден`);
        }

        return order;
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        const order = await this.findOne(id);
        Object.assign(order, updateOrderDto);
        return await this.orderRepository.save(order);
    }

    async remove(id: number) {
        const order = await this.findOne(id);
        await this.orderRepository.delete(id);
        return order;
    }

    async findByUser(userId: number) {
        const orders = await this.orderRepository.find({
            where: { userId },
            relations: ['orderItems', 'orderItems.product'],
            order: { createdAt: 'DESC' },
        });

        return {
            data: orders,
            meta: { userId, total: orders.length },
        };
    }
}