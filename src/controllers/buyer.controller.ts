import { CreateBuyerDto } from '@/dtos/create-buyer.dto';
import { CreateBuyerUseCase } from '@/use-cases/create-buyer.use-case';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('buyers')
export class BuyerController {
  constructor(protected readonly createBuyerUseCase: CreateBuyerUseCase) {}

  @Post()
  create(@Body() createBuyerDto: CreateBuyerDto) {
    console.log(createBuyerDto);
    return this.createBuyerUseCase.execute(createBuyerDto);
  }
}
