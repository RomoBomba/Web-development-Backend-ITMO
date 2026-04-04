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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderInput = exports.CreateOrderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const mapped_types_1 = require("@nestjs/mapped-types");
let OrderItemInput = class OrderItemInput {
    productId;
    quantity;
    price;
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], OrderItemInput.prototype, "productId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], OrderItemInput.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], OrderItemInput.prototype, "price", void 0);
OrderItemInput = __decorate([
    (0, graphql_1.InputType)()
], OrderItemInput);
let CreateOrderInput = class CreateOrderInput {
    userId;
    total;
    status;
    items;
};
exports.CreateOrderInput = CreateOrderInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, defaultValue: 'pending' }),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [OrderItemInput]),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "items", void 0);
exports.CreateOrderInput = CreateOrderInput = __decorate([
    (0, graphql_1.InputType)()
], CreateOrderInput);
let UpdateOrderInput = class UpdateOrderInput extends (0, mapped_types_1.PartialType)(CreateOrderInput) {
    id;
};
exports.UpdateOrderInput = UpdateOrderInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], UpdateOrderInput.prototype, "id", void 0);
exports.UpdateOrderInput = UpdateOrderInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateOrderInput);
//# sourceMappingURL=create-order.input.js.map