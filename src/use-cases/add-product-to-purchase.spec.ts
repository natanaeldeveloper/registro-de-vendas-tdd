import { beforeEach, describe, expect, it } from 'vitest';
import { AddProductToPurchase } from './add-product-to-purchase.use-case';
import { CreateProduct } from './product/create-product.use-case';
import { TheTotalPriceMustCorrespondToTheTotalPriceToTheProductsConstraint } from 'src/validates/the-total-price-must-correspond-to-the-total-price-to-the-products.constraint';
import { ProductPurchased } from 'src/entities/product-purchased.entity';

describe('add-product-topurchase.spec.ts', () => {
  let addProductToPurchase: AddProductToPurchase;
  let createProduct: CreateProduct;

  beforeEach(() => {
    addProductToPurchase = new AddProductToPurchase();
    createProduct = new CreateProduct();
  });

  it('Add product to purchase', async () => {
    const productPurchased = await addProductToPurchase.execute({
      totalPrice: 6,
      count: 2,
      product: await createProduct.execute({
        name: 'Tapioca',
        price: 3,
      }),
    });
    expect(productPurchased).instanceOf(ProductPurchased);
    expect(productPurchased.count).toEqual(2);
    expect(productPurchased.totalPrice).toEqual(6);
    expect(productPurchased.product.name).toEqual('Tapioca');
    expect(productPurchased.product.price).toEqual(3);
  });

  it('The total price must correspond to the total price to the products (test with infer value)', () => {
    expect(async () => {
      await addProductToPurchase.execute({
        totalPrice: 5, //disparidade
        count: 2,
        product: await createProduct.execute({
          name: 'Tapioca',
          price: 3,
        }),
      });
    }).rejects.toThrow(
      new TheTotalPriceMustCorrespondToTheTotalPriceToTheProductsConstraint().defaultMessage(),
    );
  });

  it('The total price must correspond to the total price to the products (test with higher value)', () => {
    expect(async () => {
      await addProductToPurchase.execute({
        totalPrice: 10, //disparidade
        count: 2,
        product: await createProduct.execute({
          name: 'Tapioca',
          price: 3,
        }),
      });
    }).rejects.toThrow(
      new TheTotalPriceMustCorrespondToTheTotalPriceToTheProductsConstraint().defaultMessage(),
    );
  });
});
