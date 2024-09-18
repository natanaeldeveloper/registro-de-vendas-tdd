import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Buyer } from 'src/entities/buyer.entity';
import { PurchaseCalculationDoesNotMatchConstraint } from 'src/validates/purchase-calculation-does-not-match.constraint';
import { CreatePurchaseProductDto } from './create-purchase-product.dto';

export class CreatePurchaseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseProductDto)
  products: CreatePurchaseProductDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Buyer)
  buyer: Buyer;

  @IsNumber()
  @IsPositive()
  @Validate(PurchaseCalculationDoesNotMatchConstraint)
  totalAmount: number;

  @IsNotEmpty()
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
