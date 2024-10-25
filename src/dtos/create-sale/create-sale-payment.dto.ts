import { PaymentMethods } from '@/shared/enums';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethods)
  payment_method: PaymentMethods;
}
