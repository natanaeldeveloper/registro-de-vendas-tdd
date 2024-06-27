import { Buyer } from 'src/entities/buyer.entity';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateBuyer } from './create-buyer.use-case';

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
    expect(async () => {
      await useCase.execute({
        name: '',
        email: 'natanael@gmail.com',
      });
    }).rejects.toThrow('O campo nome deve ser informado.');
  });

  it('Validate empty email field', async () => {
    expect(async () => {
      await useCase.execute({
        name: 'natanael',
        email: '',
      });
    }).rejects.toThrow('O campo email deve ser informado.');
  });

  it('Validate if the email field is to type email', async () => {
    expect(async () => {
      await useCase.execute({
        name: 'natanael',
        email: 'natanael#4$',
      });
    }).rejects.toThrow('O campo email deve ser do tipo email.');
  });
});
