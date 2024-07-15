import { Injectable } from '@nestjs/common';
import { PurchaseProduct } from 'src/entities/purchase-product.entity';
import { Purchase } from 'src/entities/purchase.entity';
import { BuyerService } from 'src/services/buyer.service';
import { ProductService } from 'src/services/product.service';
import { PurchaseService } from 'src/services/purchase.service';

export type MakePurchaseProps = {
  amountPaid: number;
  buyerId: number;
  products: {
    id: number;
    count: number;
  }[];
};

@Injectable()
export class MakePurchase {
  constructor(
    protected readonly purchaseService: PurchaseService,
    protected readonly productService: ProductService,
    protected readonly buyerService: BuyerService,
  ) {}
  async execute(dto: MakePurchaseProps): Promise<Purchase> {
    const buyer = await this.buyerService.findById(dto.buyerId);

    const products = await this.productService.findByIds(
      dto.products.map((item) => item.id),
    );

    const purchaseProductsArray: PurchaseProduct[] = [];

    for (let productDto of dto.products) {
      const product = products.find((item) => item.id === productDto.id);

      const purchaseProduct = new PurchaseProduct();
      purchaseProduct.count = productDto.count;
      purchaseProduct.product = product;

      purchaseProductsArray.push(purchaseProduct);
    }

    const purchase = await this.purchaseService.create({
      amountPaid: dto.amountPaid,
      buyer: buyer,
      purchaseProducts: purchaseProductsArray,
    });

    return purchase;
  }
}
