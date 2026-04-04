import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersApiController } from './orders-api.controller';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import {OrdersResolver} from "../graphql/orders.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem])],
    controllers: [OrdersController, OrdersApiController],
    providers: [OrdersService, OrdersResolver],
    exports: [OrdersService],
})
export class OrdersModule {}
