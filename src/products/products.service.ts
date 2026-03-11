import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = this.productRepository.create({
      ...createProductDto,
      category,
    });

    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new NotFoundException(`Некорректный ID товара: ${id}`);
    }

    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Товар #${id} не найден`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      product.category = category;
    }

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.delete(id);
    return product;
  }

  async getPopularProducts() {
    return await this.productRepository.find({
      take: 3,
      order: { createdAt: 'DESC' },
    });
  }

  async getRecommendedProducts() {
    const allProducts = await this.productRepository.find({
      relations: ['category'],
    });

    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, 3);

    if (recommended.length < 3 && allProducts.length > 0) {
      while (recommended.length < 3) {
        recommended.push(allProducts[0]);
      }
    }

    return recommended;
  }
}
