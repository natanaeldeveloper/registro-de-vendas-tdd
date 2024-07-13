import { Buyer } from 'src/entities/buyer.entity';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateBuyer } from './create-buyer.use-case';
import { BuyerService } from 'src/services/buyer.service';
import { ValidationError } from 'class-validator';

describe('create-buyer.spec.ts', () => {
  let createBuyer: CreateBuyer;
  let buyerService: BuyerService;

  beforeEach(() => {
    buyerService = new BuyerService();
    createBuyer = new CreateBuyer(buyerService);
  });

  it('Create a buyer', async () => {
    const buyerCreated = await createBuyer.execute({
      name: 'Natanael Oliveira',
      email: 'natanael@gmail.com',
    });

    const buyer = await buyerService.findById(buyerCreated.id);

    expect(buyer).not.toBeNull();
    expect(buyer.name).toEqual('Natanael Oliveira');
    expect(buyer.email).toEqual('natanael@gmail.com');
  });

  it('Validate empty name field', async () => {
    try {
      await createBuyer.execute({
        name: '',
        email: 'natanael@gmail.com',
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('name');
      expect(error[0].constraints).toHaveProperty('isNotEmpty');
    }
  });

  it('Validate empty email field', async () => {
    try {
      await createBuyer.execute({
        name: 'Natanel Oliveira',
        email: '',
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('email');
      expect(error[0].constraints).toHaveProperty('isNotEmpty');
    }
  });

  it('Validate if the email field is to type email', async () => {
    try {
      await createBuyer.execute({
        name: 'Natanel Oliveira',
        email: 'email#@',
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('email');
      expect(error[0].constraints).toHaveProperty('isEmail');
    }
  });
});
