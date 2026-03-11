import {IsNumber, IsString, Min, Max, IsOptional, IsPositive, MaxLength} from 'class-validator';

export class CreateReviewDto {
    @IsNumber()
    @Min(1, { message: 'Оценка должна быть от 1 до 5' })
    @Max(5, { message: 'Оценка должна быть от 1 до 5' })
    rating: number;

    @IsString()
    @IsOptional()
    @MaxLength(1000, { message: 'Комментарий слишком длинный' })
    comment?: string;

    @IsNumber()
    @IsPositive()
    userId: number;

    @IsNumber()
    @IsPositive()
    productId: number;
}