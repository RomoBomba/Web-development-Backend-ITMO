import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { Review } from './review.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    name: string | null;

    @Column({ type: 'varchar', nullable: true })
    password: string | null;

    @Column({ type: 'varchar', nullable: true, unique: true })
    supertokensUserId: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

    @Column({ type: 'varchar', default: 'user' })
    role: string;
}