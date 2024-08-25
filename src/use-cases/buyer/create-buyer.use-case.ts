import { CreateBuyerDto } from '@/dtos/create-buyer.dto';
import { Buyer } from '@/entities/buyer.entity';
import { BuyerService } from '@/services/buyer.service';
import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class CreateBuyerUseCase {
  constructor(protected readonly buyerService: BuyerService) {}

  async execute(@Body() dto: CreateBuyerDto): Promise<Buyer> {
    return await this.buyerService.create(dto);
  }
}
