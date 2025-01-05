import { UpdateStandDto } from '@/dtos/stand';
import { CreateStandDto } from '@/dtos/stand/create-stand.dto';
import { Stand } from '@/entities/stand.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';

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

  async update(id: string, dto: UpdateStandDto) {
    const hasEqualsName = await this.standRepository.findOne({
      where: {
        name: ILike(`${dto.name}`),
        id: Not(id),
      },
    });

    if (hasEqualsName) {
      throw new BadRequestException(
        'Já existe uma banca com o nome informado.',
      );
    }

    const stand = await this.standRepository.findOne({
      where: {
        id,
      },
    });

    if (!stand) {
      throw new BadRequestException('Banca de Vendas não encontrada.');
    }

    stand.color = dto.color;
    stand.name = dto.name;

    return this.standRepository.save(stand);
  }

  findAll() {
    return this.standRepository.find();
  }

  findById(id: string) {
    return this.standRepository.findOneBy({ id });
  }

  delete(id: string) {
    return this.standRepository.delete({ id });
  }
}
