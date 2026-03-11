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
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateProductDto {
    name;
    description;
    price;
    image;
    categoryId;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Название должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Название обязательно' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        const num = parseFloat(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'Цена должна быть числом' }),
    (0, class_validator_1.Min)(0, { message: 'Цена не может быть отрицательной' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'Некорректный URL изображения' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "image", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        const num = parseInt(value, 10);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'ID категории должен быть числом' }),
    (0, class_validator_1.IsPositive)({ message: 'ID категории должен быть положительным числом' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "categoryId", void 0);
//# sourceMappingURL=create-product.dto.js.map