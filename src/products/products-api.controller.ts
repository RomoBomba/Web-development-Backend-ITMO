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
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Product } from '../entities/product.entity';

@ApiTags('products')
@Controller('api/products')
export class ProductsApiController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Создать новый товар' })
    @ApiResponse({ status: 201, description: 'Товар успешно создан', type: Product })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiResponse({ status: 409, description: 'Конфликт данных' })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список товаров (с пагинацией)' })
    @ApiResponse({ status: 200, description: 'Список товаров', type: [Product] })
    @ApiResponse({ status: 400, description: 'Некорректные параметры' })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.productsService.findAllPaginated(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить товар по ID' })
    @ApiParam({ name: 'id', description: 'ID товара', example: 1 })
    @ApiResponse({ status: 200, description: 'Товар найден', type: Product })
    @ApiResponse({ status: 404, description: 'Товар не найден' })
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить товар' })
    @ApiParam({ name: 'id', description: 'ID товара', example: 1 })
    @ApiResponse({ status: 200, description: 'Товар обновлен', type: Product })
    @ApiResponse({ status: 404, description: 'Товар не найден' })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить товар' })
    @ApiParam({ name: 'id', description: 'ID товара', example: 1 })
    @ApiResponse({ status: 204, description: 'Товар удален' })
    @ApiResponse({ status: 404, description: 'Товар не найден' })
    remove(@Param('id') id: string) {
        return this.productsService.remove(+id);
    }

    @Get('category/:categoryId')
    @ApiOperation({ summary: 'Получить товары по категории' })
    @ApiParam({ name: 'categoryId', description: 'ID категории', example: 1 })
    @ApiResponse({ status: 200, description: 'Список товаров категории', type: [Product] })
    findByCategory(@Param('categoryId') categoryId: string) {
        return this.productsService.findByCategory(+categoryId);
    }
}