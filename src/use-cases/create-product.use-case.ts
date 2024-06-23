import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Product } from '../entities/product.entity';
import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';

export type CreateProductResponse = Product;

@Injectable()
export class CreateProduct {
  async execute(dto: CreateProductDto): Promise<CreateProductResponse> {
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      throw new Error(
        Object.values(validationErrors[0].constraints).join(', '),
      );
    }

    const { name, price } = dto;
    const product = new Product({
      name,
      price,
    });
    return product;
  }
}
