import { Module } from '@nestjs/common';
import { PagesController } from './pages/pages.controller';

@Module({
    imports: [],
    controllers: [PagesController],
    providers: [],
})
export class AppModule {}