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
exports.UserType = void 0;
const graphql_1 = require("@nestjs/graphql");
const order_type_1 = require("./order.type");
const review_type_1 = require("./review.type");
let UserType = class UserType {
    id;
    email;
    name;
    orders;
    reviews;
};
exports.UserType = UserType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], UserType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [order_type_1.OrderType], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], UserType.prototype, "orders", void 0);
__decorate([
    (0, graphql_1.Field)(() => [review_type_1.ReviewType], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], UserType.prototype, "reviews", void 0);
exports.UserType = UserType = __decorate([
    (0, graphql_1.ObjectType)('User')
], UserType);
//# sourceMappingURL=user.type.js.map