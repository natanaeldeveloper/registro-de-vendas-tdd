import { Injectable } from '@nestjs/common';
import { PurchaseProduct } from '@/entities/purchase-product.entity';
import { Purchase } from '@/entities/purchase.entity';
import { BuyerService } from '@/services/buyer.service';
import { ProductService } from '@/services/product.service';
import { PurchaseService } from '@/services/purchase.service';
import { PurchaseProductService } from '@/services/purchase-product.service';

export type MakePurchaseProps = {
  amountPaid: number;
  buyerId: number;
  products: {
    id: number;
    count: number;
  }[];
};

@Injectable()
export class MakePurchaseUseCase {
  constructor(
    protected readonly purchaseService: PurchaseService,
    protected readonly productService: ProductService,
    protected readonly buyerService: BuyerService,
    protected readonly purchaseProductService: PurchaseProductService,
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

    await this.purchaseProductService.saveAll(purchaseProductsArray);

    const purchase = await this.purchaseService.create({
      amountPaid: dto.amountPaid,
      buyer: buyer,
      purchaseProducts: purchaseProductsArray,
    });

    return purchase;
  }
}
