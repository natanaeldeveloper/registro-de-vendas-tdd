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
import { PurchaseProduct } from 'src/entities/purchase-product.entity';
import { PurchaseCalculationDoesNotMatch } from 'src/validates/purchase-calculation-does-not-match.constraint';
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
  @PurchaseCalculationDoesNotMatch()
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
