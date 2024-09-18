import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { MakePurchaseCartDto } from './make-purchase-cart.dto';

export class MakePurchaseDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amountPaid: number;

  @IsNumber()
  buyerId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MakePurchaseCartDto)
  cart: MakePurchaseCartDto[];
}
