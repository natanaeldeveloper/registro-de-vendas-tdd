import { CreateBuyerDto } from '@/dtos/create-buyer.dto';
import { CreateBuyerUseCase } from '@/use-cases/create-buyer.use-case';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('buyers')
export class BuyerController {
  constructor(protected readonly createBuyerUseCase: CreateBuyerUseCase) {}

  @Post()
  async create(@Res() res: Response, @Body() createBuyerDto: CreateBuyerDto) {
    const buyer = await this.createBuyerUseCase.execute(createBuyerDto);
    return res.status(HttpStatus.CREATED).json({
      data: buyer,
      statusCode: HttpStatus.CREATED,
      success: 'Created',
      message: 'Cliente registrado com sucesso.',
    });
  }
}
