import { CreateStandDto } from '@/dtos/create-stand.dto';
import { Stand } from '@/entities/stand.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class StandService {
  constructor(
    @InjectRepository(Stand)
    protected readonly standRepository: Repository<Stand>,
  ) {}

  async create(dto: CreateStandDto) {
    const stand = new Stand();
    stand.name = dto.name;
    stand.color = dto.color;

    const hasEqualsName = await this.standRepository.findOne({
      where: {
        name: ILike(`${dto.name}`),
      },
    });

    if (hasEqualsName) {
      throw new BadRequestException(
        'Já existe uma banca com o nome informado.',
      );
    }

    return this.standRepository.save(stand);
  }

  findAll() {
    return this.standRepository.find();
  }

  findById(id: string) {
    return this.standRepository.findOneBy({ id });
  }
}
