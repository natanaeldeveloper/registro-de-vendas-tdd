import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Buyer } from 'src/entities/buyer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class BuyerRepository {
  constructor(
    @InjectRepository(Buyer)
    private readonly repository: Repository<Buyer>,
  ) {}

  async save(buyer: Buyer): Promise<Buyer> {
    return await this.repository.save(buyer);
  }

  async findOneBy(where: FindOptionsWhere<Buyer> | FindOptionsWhere<Buyer>[]) {
    return await this.repository.findOneBy(where);
  }
}
