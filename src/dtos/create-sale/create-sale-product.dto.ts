import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateSaleProductDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  count: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
