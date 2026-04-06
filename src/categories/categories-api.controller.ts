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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import {Roles} from "../common/decorators/roles.decorator";
import {Public} from "../common/decorators/public.decorator";

@ApiTags('categories')
@ApiBearerAuth()
@Controller('api/categories')
export class CategoriesApiController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    @Roles('admin')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Создать новую категорию' })
    @ApiResponse({ status: 201, description: 'Категория создана', type: Category })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Получить список категорий (с пагинацией)' })
    @ApiResponse({ status: 200, description: 'Список категорий', type: [Category] })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.categoriesService.findAllPaginated(paginationDto);
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: 'Получить категорию по ID' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Категория найдена', type: Category })
    @ApiResponse({ status: 404, description: 'Категория не найдена' })
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id);
    }

    @Patch(':id')
    @Roles('admin')
    @ApiOperation({ summary: 'Обновить категорию' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Категория обновлена', type: Category })
    @ApiResponse({ status: 404, description: 'Категория не найдена' })
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto);
    }

    @Delete(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить категорию' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 204, description: 'Категория удалена' })
    @ApiResponse({ status: 404, description: 'Категория не найдена' })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }

    @Get(':id/products')
    @Public()
    @ApiOperation({ summary: 'Получить товары категории' })
    @ApiParam({ name: 'id', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Список товаров категории', type: [Product] })
    findProducts(@Param('id') id: string) {
        return this.categoriesService.findProducts(+id);
    }
}