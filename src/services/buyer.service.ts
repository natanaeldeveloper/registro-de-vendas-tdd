import { CreateBuyerDto } from '@/dtos/create-buyer.dto';
import { Buyer } from '@/entities/buyer.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        'Já existe um usuário com esse email cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const buyer = new Buyer();

    buyer.name = dto.name;
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
