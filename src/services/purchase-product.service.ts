import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { CreatePurchaseProductDto } from 'src/dtos/create-purchase-product.dto';
import { PurchaseProduct } from 'src/entities/purchase-product.entity';
import { PurchaseProductRepository } from 'src/repositories/purchase-product.repository';

@Injectable()
export class PurchaseProductService {
  constructor(
    protected readonly purchaseProductRepository: PurchaseProductRepository,
  ) {}

  async create(dtoData: CreatePurchaseProductDto): Promise<PurchaseProduct> {
    const dto = new CreatePurchaseProductDto();

    dto.count = dtoData.count;
    dto.product = dtoData.product;
    dto.purchase = dtoData.purchase;

    await validateOrReject(dto);

    const purchaseProduct = new PurchaseProduct();

    purchaseProduct.count = dto.count;
    purchaseProduct.product = dto.product;
    purchaseProduct.purchase = dto.purchase;

    return this.save(purchaseProduct);
  }

  async save(purchaseProduct: PurchaseProduct): Promise<PurchaseProduct> {
    return this.purchaseProductRepository.save(purchaseProduct);
  }

  async saveAll(
    purchaseProducts: PurchaseProduct[],
  ): Promise<PurchaseProduct[]> {
    return this.purchaseProductRepository.save(purchaseProducts);
  }

  async findById(id: number): Promise<PurchaseProduct> {
    return this.purchaseProductRepository.findOneBy({ id });
  }

  async findAllByPurchaseId(purchaseId: number): Promise<PurchaseProduct[]> {
    return this.purchaseProductRepository.find({
      where: { purchase: { id: purchaseId } },
      relations: ['product'],
    });
  }
}
