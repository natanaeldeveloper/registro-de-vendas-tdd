import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Product } from 'src/entities/product.entity';
import { ProductRepository } from 'src/repositories/product.repository';
import { In } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(protected readonly productRepository: ProductRepository) {}

  async create(dtoData: CreateProductDto): Promise<Product> {
    const dto = new CreateProductDto();

    dto.name = dtoData.name;
    dto.price = dtoData.price;

    await validateOrReject(dto);

    const product = new Product();

    product.name = dto.name;
    product.price = dto.price;

    return this.save(product);
  }

  async save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    return this.productRepository.find({ where: { id: In(ids) } });
  }
}
