import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateBuyerDto } from './create-sale-buyer.dto';
import { CreateSaleProductDto } from './create-sale-product.dto';
import { CreatePaymentDto } from './create-sale-payment.dto';

export class CreateSaleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentDto)
  payments: CreatePaymentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleProductDto)
  sale_products: CreateSaleProductDto[];

  @ValidateNested()
  @Type(() => CreateBuyerDto)
  buyer: CreateBuyerDto;
}
