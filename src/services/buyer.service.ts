import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreateBuyerDto } from 'src/dtos/create-buyer.dto';
import { Buyer } from 'src/entities/buyer.entity';
import { generateFakeId } from 'src/utils/faker.util';

export class BuyerService {
  protected buyers: Buyer[];

  constructor() {
    this.buyers = [];
  }

  async create(dtoData: CreateBuyerDto): Promise<Buyer> {
    const dto = plainToClass(CreateBuyerDto, dtoData);
    await validateOrReject(dto);

    const buyer = new Buyer({
      id: generateFakeId(),
      ...dto,
    });

    this.buyers.push(buyer);

    return buyer;
  }

  async findById(id: number): Promise<Buyer> {
    return this.buyers.find((item) => item.id === id);
  }
}
