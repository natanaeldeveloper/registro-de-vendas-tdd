import { Test, TestingModule } from '@nestjs/testing';
import { MakePurchase } from './make-purchase.use-case';
import { Buyer } from 'src/entities/buyer.entity';
import { Product } from 'src/entities/product.entity';
import { Sale } from 'src/entities/sale.entity';

describe('make-purchase.spec.ts', () => {
  let useCase: MakePurchase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakePurchase],
    }).compile();

    useCase = module.get<MakePurchase>(MakePurchase);
  });

  it('Make a purchase', async () => {
    const sale = useCase.execute({
      amountToPay: 6.0,
      amountPaid: 6.0,
      buyer: new Buyer({
        name: 'Natanael Oliveira',
        email: 'natanael@gmail.com',
      }),
      products: [
        new Product({
          name: 'Tapioca',
          price: 3.0,
        }),
      ],
    });

    expect(sale).toBeInstanceOf(Sale);
  });
});
