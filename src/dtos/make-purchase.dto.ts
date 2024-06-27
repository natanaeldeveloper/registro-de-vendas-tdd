import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';
import { Buyer } from 'src/entities/buyer.entity';
import { ProductPurchased } from 'src/entities/product-purchased.entity';
import { PurchaseCalculationDoesNotMatch } from 'src/validates/purchase-calculation-does-not-match.constraint';
import { ThePurchasePriceDoesNotCorrespondToTheValueOfTheProductsPurchased } from 'src/validates/the-purchase-price-does-not-correspond-to-value-of-the-products-purshased.constraint';

export class MakePurchaseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductPurchased)
  productsPurchased: ProductPurchased[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Buyer)
  buyer: Buyer;

  @IsNumber()
  @IsPositive()
  @PurchaseCalculationDoesNotMatch()
  @ThePurchasePriceDoesNotCorrespondToTheValueOfTheProductsPurchased()
  totalAmount: number;

  @IsNumber()
  @Min(0, {
    message: 'O Valor pago não pode ser menor que zero.',
  })
  amountPaid: number;

  @IsNumber()
  @Min(0, {
    message: 'O Valor a pagar não pode ser menor que zero.',
  })
  amountToPay: number;
}
