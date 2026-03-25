import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'Email пользователя', example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ description: 'Имя пользователя', example: 'Иван Иванов', maxLength: 50 })
    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(50)
    name?: string;

    @ApiProperty({ description: 'Пароль', example: 'Password123!', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;
}