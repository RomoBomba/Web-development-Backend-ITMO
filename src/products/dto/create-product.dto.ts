import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsUrl,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => {
    const num = parseFloat(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  price: number;

  @IsUrl({}, { message: 'Некорректный URL изображения' })
  @IsOptional()
  image?: string;

  @Transform(({ value }) => {
    const num = parseInt(value, 10);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber({}, { message: 'ID категории должен быть числом' })
  @IsPositive({ message: 'ID категории должен быть положительным числом' })
  categoryId: number;
}
