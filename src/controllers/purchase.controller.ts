import {
  MakePurchaseProps,
  MakePurchaseUseCase,
} from '@/use-cases/purchase/make-purchase.use-case';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('purchases')
export class PurchaseController {
  constructor(protected readonly makePurchaseUseCase: MakePurchaseUseCase) {}

  @Post()
  create(@Body() dto: MakePurchaseProps) {
    return this.makePurchaseUseCase.execute(dto);
  }
}
