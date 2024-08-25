import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Product } from 'src/entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
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
