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
exports.OrdersApiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const pagination_dto_1 = require("../products/dto/pagination.dto");
const order_entity_1 = require("../entities/order.entity");
let OrdersApiController = class OrdersApiController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(createOrderDto) {
        return this.ordersService.create(createOrderDto);
    }
    findAll(paginationDto) {
        return this.ordersService.findAllPaginated(paginationDto);
    }
    findOne(id) {
        return this.ordersService.findOne(+id);
    }
    update(id, updateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }
    remove(id) {
        return this.ordersService.remove(+id);
    }
    findByUser(userId) {
        return this.ordersService.findByUser(+userId);
    }
};
exports.OrdersApiController = OrdersApiController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новый заказ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Заказ создан', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Некорректные данные' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersApiController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список заказов (с пагинацией)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список заказов', type: [order_entity_1.Order] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], OrdersApiController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить заказ по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID заказа', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Заказ найден', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заказ не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersApiController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить заказ' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID заказа', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Заказ обновлен', type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заказ не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersApiController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить заказ' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID заказа', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Заказ удален' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заказ не найден' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersApiController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить заказы пользователя' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID пользователя', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список заказов пользователя', type: [order_entity_1.Order] }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersApiController.prototype, "findByUser", null);
exports.OrdersApiController = OrdersApiController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('api/orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersApiController);
//# sourceMappingURL=orders-api.controller.js.map