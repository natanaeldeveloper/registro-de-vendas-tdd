import { beforeEach, describe, expect, it } from 'vitest';
import { Product } from '../entities/product.entity';
import { CreateProduct } from './create-product.use-case';

describe('create-product.spec.ts', () => {
  let useCase: CreateProduct;

  beforeEach(() => {
    useCase = new CreateProduct();
  });

  it('Create a product', async () => {
    const product = await useCase.execute({
      name: 'Tapioca',
      price: 3.0,
    });
    expect(product).toBeInstanceOf(Product);
    expect(product.name).toEqual('Tapioca');
    expect(product.price).toEqual(3.0);
  });

  it('Validate empty name field', async () => {
    expect(async () => {
      await useCase.execute({
        name: '',
        price: 3,
      });
    }).rejects.toThrow('O campo nome deve ser informado.');
  });

  it('Validate negative price', async () => {
    expect(async () => {
      await useCase.execute({
        name: 'Bolo  de morango',
        price: -1,
      });
    }).rejects.toThrow('O preço não pode ser negativo.');
  });

  it('Validate empty price', async () => {
    expect(async () => {
      await useCase.execute({
        name: 'Bolo de morango',
        price: null,
      });
    }).rejects.toThrow('O campo preço deve ser informado.');
  });
});
