import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { BuyerController } from './controllers/buyer.controller';
import { CashierController } from './controllers/cashier.controller';
import { ProductController } from './controllers/product.controller';
import { PurchaseController } from './controllers/purchase.controller';
import { StandController } from './controllers/stand.controller';
import { Buyer } from './entities/buyer.entity';
import { Cashier } from './entities/cashier.entity';
import { ProductStock } from './entities/product-stock.entity';
import { Product } from './entities/product.entity';
import { PurchaseProduct } from './entities/purchase-product.entity';
import { Purchase } from './entities/purchase.entity';
import { Stand } from './entities/stand.entity';
import { BuyerService } from './services/buyer.service';
import { CashierService } from './services/cashier.service';
import { ProductService } from './services/product.service';
import { PurchaseProductService } from './services/purchase-product.service';
import { PurchaseService } from './services/purchase.service';
import { StandService } from './services/stand.service';
import { CreateBuyerUseCase } from './use-cases/create-buyer.use-case';
import { MakePurchaseUseCase } from './use-cases/make-purchase.use-case';

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
      entities: [
        Product,
        Buyer,
        PurchaseProduct,
        Purchase,
        Stand,
        Cashier,
        ProductStock,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Product,
      Buyer,
      PurchaseProduct,
      Purchase,
      Stand,
      Cashier,
      ProductStock,
    ]),
  ],
  controllers: [
    ProductController,
    BuyerController,
    PurchaseController,
    StandController,
    CashierController,
  ],
  providers: [
    AppService,

    /* services */
    AppService,
    BuyerService,
    ProductService,
    PurchaseProductService,
    PurchaseService,
    StandService,
    CashierService,

    /* use-cases */
    CreateBuyerUseCase,
    MakePurchaseUseCase,
  ],
})
export class AppModule {}
