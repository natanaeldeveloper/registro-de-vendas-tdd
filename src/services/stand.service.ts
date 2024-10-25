import { CreateStandDto } from '@/dtos/create-stand.dto';
import { Stand } from '@/entities/stand.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StandService {
  constructor(
    @InjectRepository(Stand)
    protected readonly standRepository: Repository<Stand>,
  ) {}

  create(dto: CreateStandDto) {
    const stand = new Stand();
    stand.name = dto.name;
    stand.color = dto.color;

    return this.standRepository.save(stand);
  }

  findAll() {
    return this.standRepository.find();
  }

  findById(id: number) {
    return this.standRepository.findOneBy({ id });
  }
}
