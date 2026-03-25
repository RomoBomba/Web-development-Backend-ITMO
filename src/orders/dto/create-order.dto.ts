import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsArray, ValidateNested, Min, IsPositive, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
    @ApiProperty({ description: 'ID товара', example: 1 })
    @IsNumber()
    @IsPositive()
    productId: number;

    @ApiProperty({ description: 'Количество', example: 2 })
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({ description: 'Цена на момент заказа', example: 145000 })
    @IsNumber()
    @Min(0)
    price: number;
}

export class CreateOrderDto {
    @ApiProperty({ description: 'ID пользователя', example: 1 })
    @IsNumber()
    @IsPositive()
    userId: number;

    @ApiProperty({ description: 'Общая сумма заказа', example: 290000 })
    @IsNumber()
    @Min(0)
    total: number;

    @ApiPropertyOptional({ description: 'Статус заказа', example: 'pending', default: 'pending' })
    @IsString()
    @IsOptional()
    status?: string;

    @ApiProperty({ description: 'Позиции заказа', type: [OrderItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}