import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { BuyerController } from './controllers/buyer.controller';
import { CashierController } from './controllers/cashier.controller';
import { ProductController } from './controllers/product.controller';
import { SaleController } from './controllers/sale.controller';
import { StandController } from './controllers/stand.controller';
import { Buyer } from './entities/buyer.entity';
import { Cashier } from './entities/cashier.entity';
import { ProductStock } from './entities/product-stock.entity';
import { Product } from './entities/product.entity';
import { SaleProduct } from './entities/sale-product.entity';
import { Sale } from './entities/sale.entity';
import { Stand } from './entities/stand.entity';
import { BuyerService } from './services/buyer.service';
import { CashierService } from './services/cashier.service';
import { ProductService } from './services/product.service';
import { SaleService } from './services/sale.service';
import { StandService } from './services/stand.service';
import { SalePayment } from './entities/sale-payment.entity';

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
        SaleProduct,
        Sale,
        Stand,
        Cashier,
        ProductStock,
        SalePayment,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Product,
      Buyer,
      SaleProduct,
      Sale,
      Stand,
      Cashier,
      ProductStock,
      SalePayment,
    ]),
  ],
  controllers: [
    ProductController,
    BuyerController,
    SaleController,
    StandController,
    CashierController,
  ],
  providers: [
    AppService,

    /* services */
    AppService,
    BuyerService,
    ProductService,
    SaleService,
    StandService,
    CashierService,
  ],
})
export class AppModule {}
