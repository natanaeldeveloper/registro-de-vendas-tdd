import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreatePurchaseDto } from 'src/dtos/create-purchase.dto';
import { Purchase } from 'src/entities/purchase.entity';
import { generateFakeId } from 'src/utils/faker.util';

export type CreatePurchaseProps = Pick<
  CreatePurchaseDto,
  'amountPaid' | 'purchaseProducts' | 'buyer'
>;

@Injectable()
export class PurchaseService {
  protected purchases: Purchase[];

  constructor() {
    this.purchases = [];
  }

  async create(dtoData: CreatePurchaseProps): Promise<Purchase> {
    const dto = new CreatePurchaseDto();

    dto.amountPaid = dtoData.amountPaid;
    dto.purchaseProducts = dtoData.purchaseProducts;
    dto.buyer = dtoData.buyer;

    dto.totalAmount = dto.purchaseProducts.reduce(
      (total, current) => total + current.count * current.product.price,
      0,
    );

    dto.amountToPay = dto.totalAmount - dto.amountPaid;

    if (dto.amountToPay < 0) {
      dto.amountToPay = 0;
    }

    await validateOrReject(dto);

    const purchase = new Purchase({
      ...dto,
      id: generateFakeId(),
    });

    this.purchases.push(purchase);

    return purchase;
  }

  async findById(id: number): Promise<Purchase> {
    return this.purchases.find((item) => item.id === id);
  }
}
