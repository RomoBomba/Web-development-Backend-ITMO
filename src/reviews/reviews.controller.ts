import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

    @Get()
    @Render('reviews/index')
    async findAll() {
        const reviews = await this.reviewsService.findAll();
        return {
            reviews,
            title: 'Управление отзывами',
            currentPage: 'reviews',
            cartCount: 0,
            isAuthenticated: true,
            useSwiper: false,
            useInputMask: false,
            pageScript: null
        };
    }

  @Get('add')
  @Render('reviews/add')
  createForm() {
    return {};
  }

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    await this.reviewsService.create(createReviewDto);
    return { redirect: '/reviews' };
  }

  @Get(':id')
  @Render('reviews/show')
  async findOne(@Param('id') id: string) {
    const review = await this.reviewsService.findOne(+id);
    return { review };
  }

  @Get(':id/edit')
  @Render('reviews/edit')
  async editForm(@Param('id') id: string) {
    const review = await this.reviewsService.findOne(+id);
    return { review };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    await this.reviewsService.update(+id, updateReviewDto);
    return { redirect: '/reviews' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.reviewsService.remove(+id);
    return { redirect: '/reviews' };
  }
}
