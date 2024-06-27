import { Injectable } from '@nestjs/common';
import { CreateBuyerDto } from 'src/dtos/create-buyer.dto';
import { Buyer } from 'src/entities/buyer.entity';
import { validateDto } from 'src/utils/validate-dto.util';

export type CreateBuyerResponse = Buyer;

@Injectable()
export class CreateBuyer {
  async execute(dtoData: CreateBuyerDto): Promise<CreateBuyerResponse> {
    const dto = new CreateBuyerDto();
    Object.assign(dto, dtoData);

    await validateDto(dto);

    const buyer = new Buyer(dto);

    return buyer;
  }
}
