import { CreateBuyerDto } from '@/dtos/create-buyer.dto';
import { BuyerService } from '@/services/buyer.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateBuyerUseCase {
  constructor(protected readonly buyerService: BuyerService) {}

  execute(createBuyerDto: CreateBuyerDto) {
    return this.buyerService.create(createBuyerDto);
  }
}
