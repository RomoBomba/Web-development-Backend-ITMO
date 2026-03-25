import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../products/dto/pagination.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });

        if (existingUser) {
            throw new ConflictException('Пользователь с таким email уже существует');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return await this.userRepository.save(user);
    }

    async findAll() {
        return await this.userRepository.find({
            relations: ['orders', 'reviews'],
        });
    }

    async findAllPaginated(paginationDto: PaginationDto) {
        const page = paginationDto.page ?? 1;
        const limit = paginationDto.limit ?? 10;
        const skip = (page - 1) * limit;

        const [data, total] = await this.userRepository.findAndCount({
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: { page, limit, total, totalPages },
            links: {
                self: `/api/users?page=${page}&limit=${limit}`,
                first: `/api/users?page=1&limit=${limit}`,
                previous: page > 1 ? `/api/users?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `/api/users?page=${page + 1}&limit=${limit}` : null,
                last: `/api/users?page=${totalPages}&limit=${limit}`,
            },
        };
    }

    async findOne(id: number) {
        if (isNaN(id) || id <= 0) {
            throw new NotFoundException(`Некорректный ID пользователя: ${id}`);
        }

        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['orders', 'reviews'],
        });

        if (!user) {
            throw new NotFoundException(`Пользователь #${id} не найден`);
        }

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        await this.userRepository.delete(id);
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['orders', 'reviews'],
        });

        if (!user) {
            throw new NotFoundException(`Пользователь с email ${email} не найден`);
        }

        return user;
    }

    async findOrders(userId: number) {
        const user = await this.findOne(userId);
        return user.orders;
    }
}