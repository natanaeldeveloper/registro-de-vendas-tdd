import { CreateBuyerDto } from '@/dtos/create-buyer.dto';
import { Buyer } from '@/entities/buyer.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(Buyer)
    protected readonly buyerRepository: Repository<Buyer>,
  ) {}

  async create(dto: CreateBuyerDto) {
    const existingBuyer = await this.findByEmail(dto.email);

    if (existingBuyer) {
      throw new BadRequestException(
        'Já existe um usuário com esse email cadastrado.',
      );
    }

    const buyer = new Buyer();

    buyer.firstName = dto.firstName;
    buyer.lastName = dto.lastName;
    buyer.email = dto.email;

    return this.save(buyer);
  }

  save(buyer: Buyer) {
    return this.buyerRepository.save(buyer);
  }

  findById(id: number) {
    return this.buyerRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.buyerRepository.findOneBy({ email });
  }
}
