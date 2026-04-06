import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
import { Review } from '../entities/review.entity';
import {Public} from "../common/decorators/public.decorator";
import {Roles} from "../common/decorators/roles.decorator";

@ApiTags('reviews')
@ApiBearerAuth()
@Controller('api/reviews')
export class ReviewsApiController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    @Roles('admin')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Создать новый отзыв' })
    @ApiResponse({ status: 201, description: 'Отзыв создан', type: Review })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiResponse({ status: 409, description: 'Отзыв уже существует' })
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewsService.create(createReviewDto);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Получить список отзывов (с пагинацией)' })
    @ApiResponse({ status: 200, description: 'Список отзывов', type: [Review] })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.reviewsService.findAllPaginated(paginationDto);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Получить отзыв по ID' })
    @ApiParam({ name: 'id', description: 'ID отзыва', example: 1 })
    @ApiResponse({ status: 200, description: 'Отзыв найден', type: Review })
    @ApiResponse({ status: 404, description: 'Отзыв не найден' })
    findOne(@Param('id') id: string) {
        return this.reviewsService.findOne(+id);
    }

    @Patch(':id')
    @Roles('admin')
    @ApiOperation({ summary: 'Обновить отзыв' })
    @ApiParam({ name: 'id', description: 'ID отзыва', example: 1 })
    @ApiResponse({ status: 200, description: 'Отзыв обновлен', type: Review })
    @ApiResponse({ status: 404, description: 'Отзыв не найден' })
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewsService.update(+id, updateReviewDto);
    }

    @Delete(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить отзыв' })
    @ApiParam({ name: 'id', description: 'ID отзыва', example: 1 })
    @ApiResponse({ status: 204, description: 'Отзыв удален' })
    @ApiResponse({ status: 404, description: 'Отзыв не найден' })
    remove(@Param('id') id: string) {
        return this.reviewsService.remove(+id);
    }

    @Get('product/:productId')
    @Public()
    @ApiOperation({ summary: 'Получить отзывы на товар' })
    @ApiParam({ name: 'productId', description: 'ID товара', example: 1 })
    @ApiResponse({ status: 200, description: 'Список отзывов на товар', type: [Review] })
    findByProduct(@Param('productId') productId: string) {
        return this.reviewsService.findByProduct(+productId);
    }

    @Get('user/:userId')
    @Public()
    @ApiOperation({ summary: 'Получить отзывы пользователя' })
    @ApiParam({ name: 'userId', description: 'ID пользователя', example: 1 })
    @ApiResponse({ status: 200, description: 'Список отзывов пользователя', type: [Review] })
    findByUser(@Param('userId') userId: string) {
        return this.reviewsService.findByUser(+userId);
    }
}