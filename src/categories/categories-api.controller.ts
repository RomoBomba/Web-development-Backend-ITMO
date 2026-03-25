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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';

@ApiTags('categories')
@Controller('api/categories')
export class CategoriesApiController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Создать новую категорию' })
    @ApiResponse({ status: 201, description: 'Категория создана', type: Category })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список категорий (с пагинацией)' })
    @ApiResponse({ status: 200, description: 'Список категорий', type: [Category] })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.categoriesService.findAllPaginated(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить категорию по ID' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Категория найдена', type: Category })
    @ApiResponse({ status: 404, description: 'Категория не найдена' })
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить категорию' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Категория обновлена', type: Category })
    @ApiResponse({ status: 404, description: 'Категория не найдена' })
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить категорию' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 204, description: 'Категория удалена' })
    @ApiResponse({ status: 404, description: 'Категория не найдена' })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }

    @Get(':id/products')
    @ApiOperation({ summary: 'Получить товары категории' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Список товаров категории', type: [Product] })
    findProducts(@Param('id') id: string) {
        return this.categoriesService.findProducts(+id);
    }
}