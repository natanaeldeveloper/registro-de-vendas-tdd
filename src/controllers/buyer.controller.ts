import { CreateBuyerDto } from '@/dtos/create-buyer.dto';
import { CreateBuyerUseCase } from '@/use-cases/buyer/create-buyer.use-case';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('buyers')
export class BuyerController {
  constructor(protected readonly createBuyerUseCase: CreateBuyerUseCase) {}

  @Post()
  create(@Body() dto: CreateBuyerDto) {
    return this.createBuyerUseCase.execute(dto);
  }
}
