import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator';
import { CreatePurchaseDto } from 'src/dtos/create-purchase.dto';
import { Purchase } from 'src/entities/purchase.entity';
import { Repository } from 'typeorm';
import { PurchaseProductService } from './purchase-product.service';
import { CreatePurchaseProductDto } from '@/dtos/create-purchase-product.dto';
import { PurchaseProduct } from '@/entities/purchase-product.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    protected readonly purchaseRepository: Repository<Purchase>,
    protected readonly purchaseProductService: PurchaseProductService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { amountToPay, totalAmount } =
      this.caluclatePurchaseValues(createPurchaseDto);

    createPurchaseDto.amountToPay = amountToPay;
    createPurchaseDto.totalAmount = totalAmount;

    await validateOrReject(createPurchaseDto);

    const purchaseProductArray: PurchaseProduct[] = [];

    for (let purchaseProductDto of createPurchaseDto.products) {
      const purchaseProduct = new PurchaseProduct();
      purchaseProduct.count = purchaseProductDto.count;
      purchaseProduct.product = purchaseProductDto.product;

      purchaseProductArray.push(purchaseProduct);
    }

    const purchase = new Purchase();

    purchase.buyer = createPurchaseDto.buyer;
    purchase.totalAmount = createPurchaseDto.totalAmount;
    purchase.amountToPay = createPurchaseDto.amountToPay;
    purchase.amountPaid = createPurchaseDto.amountPaid;
    purchase.purchaseProducts = purchaseProductArray;

    return this.save(purchase);
  }

  protected caluclatePurchaseValues(
    createPurchaseDto: CreatePurchaseDto,
  ): Pick<CreatePurchaseDto, 'totalAmount' | 'amountToPay'> {
    const totalAmount = createPurchaseDto.products.reduce(
      (total, item) => item.count * item.product.price + total,
      0,
    );

    let amountToPay = totalAmount - createPurchaseDto.amountPaid;

    if (amountToPay < 0) {
      amountToPay = 0;
    }

    return {
      totalAmount,
      amountToPay,
    };
  }

  async save(purchaseProduct: Purchase) {
    return this.purchaseRepository.save(purchaseProduct);
  }

  async findById(id: number) {
    return this.purchaseRepository.findOneBy({ id });
  }
}
