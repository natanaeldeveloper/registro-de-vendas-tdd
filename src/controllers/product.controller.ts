import { CreateProductDto } from '@/dtos/create-product.dto';
import { CreateProductUseCase } from '@/use-cases/create-product.use-case';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(protected readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }
}
