import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersApiController } from './users-api.controller';
import { User } from '../entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController, UsersApiController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}