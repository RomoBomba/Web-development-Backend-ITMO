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
exports.ReviewType = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_type_1 = require("./user.type");
const product_type_1 = require("./product.type");
let ReviewType = class ReviewType {
    id;
    rating;
    comment;
    user;
    product;
};
exports.ReviewType = ReviewType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], ReviewType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ReviewType.prototype, "rating", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ReviewType.prototype, "comment", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_type_1.UserType),
    __metadata("design:type", user_type_1.UserType)
], ReviewType.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => product_type_1.ProductType),
    __metadata("design:type", product_type_1.ProductType)
], ReviewType.prototype, "product", void 0);
exports.ReviewType = ReviewType = __decorate([
    (0, graphql_1.ObjectType)('Review')
], ReviewType);
//# sourceMappingURL=review.type.js.map