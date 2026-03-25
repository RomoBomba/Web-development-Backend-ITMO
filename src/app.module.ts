import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { parse } from 'pg-connection-string';
import { PagesController } from './pages/pages.controller';
import { User } from './entities/user.entity';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Review } from './entities/review.entity';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                const connectionString = process.env.DATABASE_URL;
                if (!connectionString) {
                    throw new Error('DATABASE_URL environment variable is not defined');
                }

                const config = parse(connectionString);

                return {
                    type: 'postgres',
                    host: config.host || undefined,
                    port: config.port ? parseInt(config.port, 10) : 5432,
                    username: config.user || undefined,
                    password: config.password || undefined,
                    database: config.database || undefined,
                    entities: [User, Category, Product, Order, OrderItem, Review],
                    synchronize: false,
                    logging: true,
                    ssl: { rejectUnauthorized: false },
                };
            },
        }),
        ProductsModule,
        CategoriesModule,
        OrdersModule,
        UsersModule,
        ReviewsModule,
    ],
    controllers: [PagesController],
    providers: [],
})
export class AppModule {}