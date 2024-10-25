import { CreateCashierDto } from '@/dtos/create-cashier.dto';
import { CashierService } from '@/services/cashier.service';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('cashiers')
export class CashierController {
  constructor(protected readonly cashierService: CashierService) {}

  @Post()
  async create(@Body() dto: CreateCashierDto, @Res() res: Response) {
    const data = await this.cashierService.create(dto);
    return res.status(HttpStatus.CREATED).json({ data });
  }

  @Get()
  async getAll(@Res() res: Response) {
    const data = this.cashierService.getAll();

    return res.json({ data });
  }
}
