import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../entities/product.entity';
import { CreateProduct } from './create-product.use-case';

describe('create-product.spec.ts', () => {
  let useCase: CreateProduct;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProduct],
    }).compile();

    useCase = module.get<CreateProduct>(CreateProduct);
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
});
