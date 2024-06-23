import { beforeEach, describe, expect, it } from 'vitest';
import { Buyer } from '../entities/buyer.entity';
import { Product } from '../entities/product.entity';
import { Sale } from '../entities/sale.entity';
import { MakePurchase } from './make-purchase.use-case';

describe('make-purchase.spec.ts', () => {
  let useCase: MakePurchase;

  beforeEach(() => {
    useCase = new MakePurchase();
  });

  it('Make a purchase', async () => {
    const sale = await useCase.execute({
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
        new Product({
          name: 'Hot-dog',
          price: 3.0,
        }),
      ],
    });

    expect(sale).toBeInstanceOf(Sale);
    expect(sale.products).toHaveLength(2);
    expect(sale.products[1].name).toEqual('Hot-dog');
    expect(sale.buyer.name).toEqual('Natanael Oliveira');
  });
});
