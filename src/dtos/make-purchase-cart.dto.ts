import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class MakePurchaseCartDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  count: number;
}
