import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { OrderItem } from '../../entities/order-item.entity';
import {Category} from "../../entities/category.entity";
import {Review} from "../../entities/review.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    image: string;

    @Column({ name: 'categoryId' })
    categoryId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[];

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];
}