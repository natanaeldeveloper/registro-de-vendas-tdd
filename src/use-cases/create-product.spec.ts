import { describe, it, expect, beforeEach } from 'vitest';
import { Product } from '../entities/product.entity';
import { CreateProduct } from './create-product.use-case';
import { CreateProductDto } from 'src/dtos/create-product.dto';

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
    const dto = new CreateProductDto();

    dto.name = '';
    dto.price = 3;

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow('O campo nome deve ser informado.');
  });

  it('Validate negative price', async () => {
    const dto = new CreateProductDto();

    dto.name = 'Bolo de morango';
    dto.price = -1;

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow('O preço não pode ser negativo.');
  });

  it('Validate empty price', async () => {
    const dto = new CreateProductDto();

    dto.name = 'Bolo de morango';
    dto.price = null;

    expect(async () => {
      await useCase.execute(dto);
    }).rejects.toThrow('O campo preço deve ser informado.');
  });
});
