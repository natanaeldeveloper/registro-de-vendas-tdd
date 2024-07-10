import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { ProductService } from 'src/services/product.service';
import { Product } from '../../entities/product.entity';

@Injectable()
export class CreateProduct {
  constructor(protected readonly productService: ProductService) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    return await this.productService.create(dto);
  }
}
