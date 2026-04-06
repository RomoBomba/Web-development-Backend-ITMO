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

    @ApiPropertyOptional({ description: 'Пароль (необязателен для SuperTokens)', example: 'password123' })
    @IsString()
    @IsOptional()
    @MinLength(6)
    password?: string;

    @ApiPropertyOptional({ description: 'ID из SuperTokens' })
    @IsString()
    @IsOptional()
    supertokensUserId?: string;

    @IsOptional()
    @IsString()
    role?: string;
}