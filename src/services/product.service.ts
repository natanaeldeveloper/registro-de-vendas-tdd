import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Product } from 'src/entities/product.entity';
import { generateFakeId } from 'src/utils/faker.util';

@Injectable()
export class ProductService {
  protected products: Product[];

  constructor() {
    this.products = [];
  }

  async create(dtoData: CreateProductDto): Promise<Product> {
    const dto = plainToClass(CreateProductDto, dtoData);
    await validateOrReject(dto);

    const product = new Product({
      id: generateFakeId(),
      ...dto,
    });

    this.products.push(product);

    return product;
  }

  async findById(id: number): Promise<Product> {
    return this.products.find((item) => item.id === id);
  }
}
