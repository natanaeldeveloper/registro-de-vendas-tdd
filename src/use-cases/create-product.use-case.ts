import { CreateProductDto } from '@/dtos/create-product.dto';
import { ProductService } from '@/services/product.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase {
  constructor(protected readonly productService: ProductService) {}

  execute(createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}
