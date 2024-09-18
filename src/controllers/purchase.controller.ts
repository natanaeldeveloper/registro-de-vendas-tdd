import { MakePurchaseDto } from '@/dtos/make-purchase.dto';
import { MakePurchaseUseCase } from '@/use-cases/make-purchase.use-case';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('purchases')
export class PurchaseController {
  constructor(protected readonly makePurchaseUseCase: MakePurchaseUseCase) {}

  @Post()
  create(@Body() makePurchaseDto: MakePurchaseDto) {
    return this.makePurchaseUseCase.execute(makePurchaseDto);
  }
}
