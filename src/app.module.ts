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
import { ProductRepository } from './repositories/product.repository';
import { PurchaseProductRepository } from './repositories/purchase-product.repository';
import { BuyerRepository } from './repositories/buyer.repository';
import { PurchaseRepository } from './repositories/purchase.repository';

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
  controllers: [AppController],
  providers: [
    /* Repositories */
    BuyerRepository,
    PurchaseRepository,
    PurchaseProductRepository,
    ProductRepository,

    /* services */
    AppService,
    BuyerService,
    ProductService,
    PurchaseProductService,
    PurchaseService,

    /* use-cases */
    CreateBuyer,
    CreateProduct,
    MakePurchase,
  ],
})
export class AppModule {}
