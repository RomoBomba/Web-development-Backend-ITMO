import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<{
        orders: import("../entities/order.entity").Order[];
    }>;
    createForm(): {};
    create(createOrderDto: CreateOrderDto): Promise<{
        redirect: string;
    }>;
    findOne(id: string): Promise<{
        order: import("../entities/order.entity").Order;
    }>;
    editForm(id: string): Promise<{
        order: import("../entities/order.entity").Order;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        redirect: string;
    }>;
    remove(id: string): Promise<{
        redirect: string;
    }>;
}
