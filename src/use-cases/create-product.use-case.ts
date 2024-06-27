import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { validateDto } from 'src/utils/validate-dto.util';
import { Product } from '../entities/product.entity';

export type CreateProductResponse = Product;

@Injectable()
export class CreateProduct {
  async execute(dtoData: CreateProductDto): Promise<CreateProductResponse> {
    const dto = new CreateProductDto();

    Object.assign(dto, dtoData);

    await validateDto(dto);

    const product = new Product(dto);
    return product;
  }
}
