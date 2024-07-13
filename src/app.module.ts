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

@Module({
  imports: [],
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
