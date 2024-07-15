import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { CreateBuyerDto } from 'src/dtos/create-buyer.dto';
import { Buyer } from 'src/entities/buyer.entity';
import { BuyerRepository } from 'src/repositories/buyer.repository';

@Injectable()
export class BuyerService {
  constructor(protected readonly buyerRepository: BuyerRepository) {}

  async create(dtoData: CreateBuyerDto): Promise<Buyer> {
    const dto = new CreateBuyerDto();

    dto.name = dtoData.name;
    dto.email = dtoData.email;

    await validateOrReject(dto);

    const buyer = new Buyer();

    buyer.name = dto.name;
    buyer.email = dto.email;

    return this.save(buyer);
  }

  async save(buyer: Buyer): Promise<Buyer> {
    return this.buyerRepository.save(buyer);
  }

  async findById(id: number): Promise<Buyer> {
    return this.buyerRepository.findOneBy({ id });
  }
}
