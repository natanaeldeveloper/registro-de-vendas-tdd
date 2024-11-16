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
  IsOptional,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateProductStockDto } from './create-product-stock.dto';

export class CreateCashierDto {
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @MinLength(3)
  description: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  reference_date: Date;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  initial_cash: number;

  @IsBoolean()
  future_payment: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(PaymentMethods, { each: true })
  payment_methods: PaymentMethods[];

  @ValidateIf((dto: CreateCashierDto) =>
    dto.payment_methods.includes(PaymentMethods.PIX),
  )
  @Transform(({ value }) => value?.trim())
  @MinLength(3)
  pix_key: string;

  @ValidateIf((dto: CreateCashierDto) =>
    dto.payment_methods.includes(PaymentMethods.PIX),
  )
  @Transform(({ value }) => value?.trim())
  @MinLength(3)
  pix_recipient: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductStockDto)
  products_stock: CreateProductStockDto[];
}
