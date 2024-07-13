import { Injectable } from '@nestjs/common';
import { Purchase } from 'src/entities/purchase.entity';
import { BuyerService } from 'src/services/buyer.service';
import { ProductService } from 'src/services/product.service';
import { PurchaseProductService } from 'src/services/purchase-product.service';
import {
  CreatePurchaseProps,
  PurchaseService,
} from 'src/services/purchase.service';

export type MakePurchaseProps = {
  amountPaid: number;
  buyerId: number;
  purchaseProducts: {
    productId: number;
    count: number;
  }[];
};

@Injectable()
export class MakePurchase {
  constructor(
    protected readonly purchaseService: PurchaseService,
    protected readonly productService: ProductService,
    protected readonly purchaseProductService: PurchaseProductService,
    protected readonly buyerService: BuyerService,
  ) {}
  async execute(dto: MakePurchaseProps): Promise<Purchase> {
    const createPurchaseData: CreatePurchaseProps = {
      amountPaid: dto.amountPaid,
      purchaseProducts: [],
      buyer: null,
    };

    createPurchaseData.buyer = await this.buyerService.findById(dto.buyerId);
    const products = await this.productService.findByIds(
      dto.purchaseProducts.map((item) => item.productId),
    );

    for (let purchaseProduct of dto.purchaseProducts) {
      const product = products.find(
        (item) => item.id === purchaseProduct.productId,
      );

      const purchaseProductSaved = await this.purchaseProductService.create({
        count: purchaseProduct.count,
        product,
      });

      createPurchaseData.purchaseProducts.push(purchaseProductSaved);
    }

    return await this.purchaseService.create(createPurchaseData);
  }
}
