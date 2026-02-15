import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesController } from './pages/pages.controller';

@Module({
  imports: [],
  controllers: [AppController, PagesController],
  providers: [AppService],
})
export class AppModule {}
