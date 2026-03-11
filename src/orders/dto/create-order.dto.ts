import { IsNumber, IsArray, ValidateNested, Min, IsPositive, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNumber()
    @Min(1, { message: 'Количество должно быть не менее 1' })
    quantity: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;
}

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    userId: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    total: number;

    @IsString()
    @IsOptional()
    status?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}