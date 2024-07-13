import { ValidationError } from 'class-validator';
import { ProductService } from 'src/services/product.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateProduct } from './create-product.use-case';

describe('create-product.spec.ts', () => {
  let createProduct: CreateProduct;
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    createProduct = new CreateProduct(productService);
  });

  it('Create a product', async () => {
    const productCreated = await createProduct.execute({
      name: 'Tapioca',
      price: 3.0,
    });

    const product = await productService.findById(productCreated.id);

    expect(product).not.toBeNull();
    expect(product.name).toEqual('Tapioca');
    expect(product.price).toEqual(3.0);
  });

  it('Validate empty name field', async () => {
    try {
      await createProduct.execute({
        name: '',
        price: 3,
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('name');
      expect(error[0].constraints).toHaveProperty('isNotEmpty');
    }
  });

  it('Validate empty price', async () => {
    try {
      await createProduct.execute({
        name: 'Bolo de morango',
        price: null,
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('price');
      expect(error[0].constraints).toHaveProperty('isNotEmpty');
    }
  });

  it('Validate negative price', async () => {
    try {
      await createProduct.execute({
        name: 'Bolo de morango',
        price: -1,
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('price');
      expect(error[0].constraints).toHaveProperty('min');
    }
  });
});
