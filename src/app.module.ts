import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateProduct } from './use-cases/create-product.use-case';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CreateProduct],
})
export class AppModule {}
