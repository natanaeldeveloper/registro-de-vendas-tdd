import { CreateProductDto } from '@/dtos/create-product.dto';
import { Product } from '@/entities/product.entity';
import { ProductService } from '@/services/product.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase {
  constructor(protected readonly productService: ProductService) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    return await this.productService.create(dto);
  }
}
