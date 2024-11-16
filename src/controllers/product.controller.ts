import { CreateProductDto } from '@/dtos/create-product.dto';
import { ProductService } from '@/services/product.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('stands/:standId/products')
export class ProductController {
  constructor(protected readonly productService: ProductService) {}

  @Post()
  async create(@Body() dto: CreateProductDto, @Res() res: Response) {
    const data = await this.productService.create(dto);
    return res.status(HttpStatus.CREATED).json({
      data,
      statusCode: HttpStatus.CREATED,
      success: 'Created',
      message: 'Produto registrado com sucesso.',
    });
  }

  @Get()
  async getProductsByStandId(
    @Param('standId') standId: string,
    @Res() res: Response,
  ) {
    const data = await this.productService.getWhereByStandId(standId);
    return res.json({ data });
  }
}
