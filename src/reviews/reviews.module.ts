import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsApiController } from './reviews-api.controller';
import { Review } from '../entities/review.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Review])],
    controllers: [ReviewsController, ReviewsApiController],
    providers: [ReviewsService],
    exports: [ReviewsService],
})
export class ReviewsModule {}