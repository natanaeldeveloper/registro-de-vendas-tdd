import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateProduct } from './use-cases/product/create-product.use-case';
import { CreateBuyer } from './use-cases/buyer/create-buyer.use-case';
import { MakePurchase } from './use-cases/purchase/make-purchase.use-case';
import { PurchaseProductService } from './services/purchase-product.service';
import { ProductService } from './services/product.service';
import { BuyerService } from './services/buyer.service';
import { PurchaseService } from './services/purchase.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Buyer } from './entities/buyer.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchaseProduct } from './entities/purchase-product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Product, Buyer, PurchaseProduct, Purchase],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Buyer, PurchaseProduct, Purchase]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CreateBuyer,
    CreateProduct,
    MakePurchase,
    ProductService,
    PurchaseProductService,
    BuyerService,
    PurchaseService,
  ],
})
export class AppModule {}
