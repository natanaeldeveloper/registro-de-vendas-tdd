import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePurchaseProductDto } from 'src/dtos/create-purchase-product.dto';
import { PurchaseProduct } from 'src/entities/purchase-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseProductService {
  constructor(
    @InjectRepository(PurchaseProduct)
    protected readonly purchaseProductRepository: Repository<PurchaseProduct>,
  ) {}

  create(dto: CreatePurchaseProductDto) {
    const purchaseProduct = new PurchaseProduct();

    purchaseProduct.count = dto.count;
    purchaseProduct.product = dto.product;

    return this.save(purchaseProduct);
  }

  save(purchaseProduct: PurchaseProduct) {
    return this.purchaseProductRepository.save(purchaseProduct);
  }

  saveAll(purchaseProducts: PurchaseProduct[]) {
    return this.purchaseProductRepository.save(purchaseProducts);
  }

  findById(id: number) {
    return this.purchaseProductRepository.findOneBy({ id });
  }

  findAllByPurchaseId(purchaseId: number) {
    return this.purchaseProductRepository.find({
      where: { purchase: { id: purchaseId } },
      relations: ['product'],
    });
  }
}
