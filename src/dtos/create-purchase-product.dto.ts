import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { Product } from 'src/entities/product.entity';
import { Type } from 'class-transformer';

export class CreatePurchaseProductDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  count: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Product)
  product: Product;
}
