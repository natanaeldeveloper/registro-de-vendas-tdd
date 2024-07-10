import { Injectable } from '@nestjs/common';
import { CreateBuyerDto } from 'src/dtos/create-buyer.dto';
import { Buyer } from 'src/entities/buyer.entity';
import { BuyerService } from 'src/services/buyer.service';

@Injectable()
export class CreateBuyer {
  constructor(protected readonly buyerService: BuyerService) {}

  async execute(dto: CreateBuyerDto): Promise<Buyer> {
    return await this.buyerService.create(dto);
  }
}
