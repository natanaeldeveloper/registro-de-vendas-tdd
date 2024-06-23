import { beforeEach, describe, expect, it } from 'vitest';
import { CreateBuyer } from './create-buyer.use-case';
import { Buyer } from 'src/entities/buyer.entity';
import { CreateBuyerDto } from 'src/dtos/create-buyer.dto';

describe('create-buyer.spec.ts', () => {
  let useCase: CreateBuyer;

  beforeEach(() => {
    useCase = new CreateBuyer();
  });

  it('Create a buyer', async () => {
    const buyer = await useCase.execute({
      name: 'Natanael Oliveira',
      email: 'natanael@gmail.com',
    });

    expect(buyer).toBeInstanceOf(Buyer);
    expect(buyer.name).toEqual('Natanael Oliveira');
    expect(buyer.email).toEqual('natanael@gmail.com');
  });

  it('Validate empty name field', async () => {
    const dto = new CreateBuyerDto();

    dto.name = '';
    dto.email = 'natanael@gmail.com';

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow('O campo nome deve ser informado.');
  });

  it('Validate empty email field', async () => {
    const dto = new CreateBuyerDto();

    dto.name = 'natanael';
    dto.email = '';

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow('O campo email deve ser informado.');
  });

  it('Validate if the email field is to type email', async () => {
    const dto = new CreateBuyerDto();

    dto.name = 'natanael';
    dto.email = 'natanael$#';

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow('O campo email deve ser do tipo email.');
  });
});
