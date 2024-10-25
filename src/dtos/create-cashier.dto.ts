import { PaymentMethods } from '@/shared/enums';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateProductStockDto } from './create-product-stock.dto';

export class CreateCashierDto {
  @Transform(({ value }) => value?.trim())
  @MinLength(3)
  name: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  reference_date: Date;

  @IsNumber()
  @Min(0)
  initial_cash: number;

  @IsBoolean()
  future_payment: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(PaymentMethods, { each: true })
  payment_methods: PaymentMethods[];

  @Transform(({ value }) => value?.trim())
  @MinLength(3)
  pix_key: string;

  @Transform(({ value }) => value?.trim())
  @MinLength(3)
  pix_recipient: string;

  @IsNotEmpty()
  @IsNumber()
  stand_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductStockDto)
  products_stock: CreateProductStockDto[];
}
