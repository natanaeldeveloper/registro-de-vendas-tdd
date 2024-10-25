import { CreateBuyerDto } from '@/dtos/create-sale/create-sale-buyer.dto';
import { BuyerService } from '@/services/buyer.service';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('buyers')
export class BuyerController {
  constructor(protected readonly buyerService: BuyerService) {}

  @Post()
  async create(@Res() res: Response, @Body() dto: CreateBuyerDto) {
    const data = await this.buyerService.create(dto);
    return res.status(HttpStatus.CREATED).json({
      data,
      statusCode: HttpStatus.CREATED,
      success: 'Created',
      message: 'Cliente registrado com sucesso.',
    });
  }
}
