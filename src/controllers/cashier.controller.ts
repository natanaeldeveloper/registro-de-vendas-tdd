import { CreateCashierDto } from '@/dtos/create-cashier.dto';
import { CashierService } from '@/services/cashier.service';
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

@Controller('stands/:standId/cashiers')
export class CashierController {
  constructor(protected readonly cashierService: CashierService) {}

  @Post()
  async create(
    @Param('standId') standId: string,
    @Body() dto: CreateCashierDto,
    @Res() res: Response,
  ) {
    const data = await this.cashierService.create(dto, standId);
    return res.status(HttpStatus.CREATED).json({
      data,
      statusCode: HttpStatus.CREATED,
      success: 'Created',
      message: 'Caixa registrado com sucesso.',
    });
  }

  @Get()
  async getCashiersByStandId(
    @Param('standId') standId: string,
    @Res() res: Response,
  ) {
    const data = await this.cashierService.getWhereByStandId(standId);
    return res.json({ data });
  }
}
