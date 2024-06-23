import { validate } from 'class-validator';
import { CreateBuyerDto } from 'src/dtos/create-buyer.dto';
import { Buyer } from 'src/entities/buyer.entity';

export type CreateBuyerResponse = Buyer;

export class CreateBuyer {
  async execute(dto: CreateBuyerDto): Promise<CreateBuyerResponse> {
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      throw new Error(
        Object.values(validationErrors[0].constraints).join(', '),
      );
    }

    const { name, email } = dto;
    const buyer = new Buyer({
      name,
      email,
    });

    return buyer;
  }
}
