import { CreateBuyerDto } from '@/dtos/create-buyer.dto';
import { Buyer } from '@/entities/buyer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(Buyer)
    private readonly buyerRepository: Repository<Buyer>,
  ) {}

  async create(dto: CreateBuyerDto): Promise<Buyer> {
    const buyer = new Buyer();

    buyer.name = dto.name;
    buyer.email = dto.email;

    return this.buyerRepository.save(buyer);
  }

  async save(buyer: Buyer): Promise<Buyer> {
    return this.buyerRepository.save(buyer);
  }

  async findById(id: number): Promise<Buyer> {
    return this.buyerRepository.findOneBy({ id });
  }
}
