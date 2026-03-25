import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min, Max, IsPositive } from 'class-validator';

export class CreateReviewDto {
    @ApiProperty({ description: 'Оценка от 1 до 5', example: 5, minimum: 1, maximum: 5 })
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiPropertyOptional({ description: 'Текст отзыва', example: 'Отличная гитара!' })
    @IsString()
    @IsOptional()
    comment?: string;

    @ApiProperty({ description: 'ID пользователя', example: 1 })
    @IsNumber()
    @IsPositive()
    userId: number;

    @ApiProperty({ description: 'ID товара', example: 1 })
    @IsNumber()
    @IsPositive()
    productId: number;
}