import { Injectable } from '@nestjs/common';
import { MakePurchaseDto } from 'src/dtos/make-purchase.dto';
import { Purchase } from 'src/entities/purchase.entity';
import { validateDto } from 'src/utils/validate-dto.util';

export type MakePurchaseResponse = Purchase;

@Injectable()
export class MakePurchase {
  async execute(
    dtoData: Partial<MakePurchaseDto>,
  ): Promise<MakePurchaseResponse> {
    const dto = new MakePurchaseDto();
    Object.assign(dto, dtoData);

    if (typeof dto.totalAmount == 'undefined') {
      dto.totalAmount = dto.productsPurchased.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    }

    if (typeof dto.amountToPay == 'undefined') {
      const sum = dto.totalAmount - dto.amountPaid;
      dto.amountToPay = sum < 0 ? 0 : sum;
    }

    await validateDto(dto);

    const purchase = new Purchase(dto);

    return purchase;
  }
}
