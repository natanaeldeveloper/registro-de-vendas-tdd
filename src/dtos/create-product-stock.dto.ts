import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateProductStockDto {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  count: number;
}
