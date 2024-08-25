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

  async create(dto: CreatePurchaseProductDto): Promise<PurchaseProduct> {
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
