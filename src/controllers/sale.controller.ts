import { CreateSaleDto } from '@/dtos/create-sale/create-sale.dto';
import { SaleService } from '@/services/sale.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('sales')
export class SaleController {
  constructor(protected readonly saleService: SaleService) {}

  @Post()
  create(@Body() dto: CreateSaleDto) {
    return this.saleService.create(dto);
  }
}
