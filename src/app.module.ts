import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { BuyerController } from './controllers/buyer.controller';
import { ProductController } from './controllers/product.controller';
import { PurchaseController } from './controllers/purchase.controller';
import { Buyer } from './entities/buyer.entity';
import { Product } from './entities/product.entity';
import { PurchaseProduct } from './entities/purchase-product.entity';
import { Purchase } from './entities/purchase.entity';
import { BuyerService } from './services/buyer.service';
import { ProductService } from './services/product.service';
import { PurchaseProductService } from './services/purchase-product.service';
import { PurchaseService } from './services/purchase.service';
import { CreateBuyerUseCase } from './use-cases/buyer/create-buyer.use-case';
import { CreateProductUseCase } from './use-cases/product/create-product.use-case';
import { MakePurchaseUseCase } from './use-cases/purchase/make-purchase.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Product, Buyer, PurchaseProduct, Purchase],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Buyer, PurchaseProduct, Purchase]),
  ],
  controllers: [ProductController, BuyerController, PurchaseController],
  providers: [
    AppService,

    /* services */
    AppService,
    BuyerService,
    ProductService,
    PurchaseProductService,
    PurchaseService,

    /* use-cases */
    CreateBuyerUseCase,
    CreateProductUseCase,
    MakePurchaseUseCase,
  ],
})
export class AppModule {}
