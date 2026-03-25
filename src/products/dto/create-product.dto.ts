import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, IsUrl, IsNotEmpty, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
    @ApiProperty({ description: 'Название товара', example: 'Fender Stratocaster' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ description: 'Описание товара', example: 'Легендарная электрогитара' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Цена в рублях', example: 145000 })
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @Min(0)
    price: number;

    @ApiPropertyOptional({ description: 'URL изображения', example: 'https://example.com/guitar.jpg' })
    @IsUrl()
    @IsOptional()
    image?: string;

    @ApiProperty({ description: 'ID категории', example: 1 })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsPositive()
    categoryId: number;
}