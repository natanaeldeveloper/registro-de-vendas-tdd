import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Product } from 'src/entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) protected productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const existingProduct = await this.findByName(dto.name);

    if (existingProduct) {
      throw new BadRequestException('Produto com esse nome já cadastrado.');
    }

    const product = new Product();

    product.name = dto.name;
    product.price = dto.price;

    return this.productRepository.save(product);
  }

  getAll() {
    return this.productRepository.find();
  }

  findById(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  findByIds(ids: number[]) {
    return this.productRepository.find({ where: { id: In(ids) } });
  }

  findByName(name: string) {
    return this.productRepository.findOneBy({ name });
  }
}
