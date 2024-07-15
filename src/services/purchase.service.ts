import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from 'src/dtos/create-purchase.dto';
import { Purchase } from 'src/entities/purchase.entity';
import { PurchaseRepository } from 'src/repositories/purchase.repository';
import { PurchaseProductService } from './purchase-product.service';
import { validateOrReject } from 'class-validator';

export type CreatePurchaseProps = Pick<
  CreatePurchaseDto,
  'amountPaid' | 'buyer' | 'purchaseProducts'
>;

@Injectable()
export class PurchaseService {
  constructor(
    protected readonly purchaseRepository: PurchaseRepository,
    protected readonly purchaseProductService: PurchaseProductService,
  ) {}

  async create(dtoData: CreatePurchaseProps): Promise<Purchase> {
    const dto = new CreatePurchaseDto();

    dto.buyer = dtoData.buyer;
    dto.amountPaid = dtoData.amountPaid;
    dto.purchaseProducts = dtoData.purchaseProducts;

    const { amountToPay, totalAmount } = this.caluclatePurchaseValues({
      amountPaid: dto.amountPaid,
      purchaseProducts: dto.purchaseProducts,
    });

    dto.amountToPay = amountToPay;
    dto.totalAmount = totalAmount;

    await validateOrReject(dto);

    const purchase = new Purchase();

    purchase.buyer = dto.buyer;
    purchase.totalAmount = dto.totalAmount;
    purchase.amountToPay = dto.amountToPay;
    purchase.amountPaid = dto.amountPaid;
    purchase.purchaseProducts = dto.purchaseProducts;

    return this.save(purchase);
  }

  protected caluclatePurchaseValues(
    props: Pick<Purchase, 'purchaseProducts' | 'amountPaid'>,
  ): Pick<Purchase, 'totalAmount' | 'amountToPay'> {
    const totalAmount = props.purchaseProducts.reduce(
      (total, item) => item.count * item.product.price + total,
      0,
    );

    let amountToPay = totalAmount - props.amountPaid;

    if (amountToPay < 0) {
      amountToPay = 0;
    }

    return {
      totalAmount,
      amountToPay,
    };
  }

  async save(purchaseProduct: Purchase): Promise<Purchase> {
    return this.purchaseRepository.save(purchaseProduct);
  }

  async findById(id: number): Promise<Purchase> {
    return this.purchaseRepository.findOneBy({ id });
  }
}
