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
exports.OrdersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_type_1 = require("../graphql/order.type");
const create_order_input_1 = require("../graphql/create-order.input");
const pagination_args_1 = require("../graphql/pagination.args");
const pagination_type_1 = require("../graphql/pagination.type");
const orders_service_1 = require("../orders/orders.service");
const PaginatedOrder = (0, pagination_type_1.Paginated)(order_type_1.OrderType);
let OrdersResolver = class OrdersResolver {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async orders(pagination) {
        return this.ordersService.findAllPaginatedGraphQL(pagination);
    }
    async order(id) {
        return this.ordersService.findOne(id);
    }
    async createOrder(data) {
        return this.ordersService.create(data);
    }
    async updateOrder(data) {
        return this.ordersService.update(data.id, data);
    }
    async deleteOrder(id) {
        return this.ordersService.remove(id);
    }
    async userOrders(userId) {
        return this.ordersService.findByUser(userId);
    }
};
exports.OrdersResolver = OrdersResolver;
__decorate([
    (0, graphql_1.Query)(() => PaginatedOrder),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_args_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "orders", null);
__decorate([
    (0, graphql_1.Query)(() => order_type_1.OrderType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "order", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_type_1.OrderType),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_input_1.CreateOrderInput]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "createOrder", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_type_1.OrderType),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_input_1.UpdateOrderInput]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "updateOrder", null);
__decorate([
    (0, graphql_1.Mutation)(() => order_type_1.OrderType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "deleteOrder", null);
__decorate([
    (0, graphql_1.Query)(() => [order_type_1.OrderType]),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersResolver.prototype, "userOrders", null);
exports.OrdersResolver = OrdersResolver = __decorate([
    (0, graphql_1.Resolver)(() => order_type_1.OrderType),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersResolver);
//# sourceMappingURL=orders.resolver.js.map