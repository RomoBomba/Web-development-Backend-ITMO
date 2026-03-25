"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const order_item_entity_1 = require("../entities/order-item.entity");
let OrdersService = class OrdersService {
    orderRepository;
    orderItemRepository;
    constructor(orderRepository, orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }
    async create(createOrderDto) {
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
    async findAllPaginated(paginationDto) {
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
    async findOne(id) {
        if (isNaN(id) || id <= 0) {
            throw new common_1.NotFoundException(`Некорректный ID заказа: ${id}`);
        }
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'orderItems', 'orderItems.product'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Заказ #${id} не найден`);
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        Object.assign(order, updateOrderDto);
        return await this.orderRepository.save(order);
    }
    async remove(id) {
        const order = await this.findOne(id);
        await this.orderRepository.delete(id);
        return order;
    }
    async findByUser(userId) {
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map