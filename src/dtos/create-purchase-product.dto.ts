import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { Product } from 'src/entities/product.entity';

export class CreatePurchaseProductDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  count: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Product)
  product: Product;
}
