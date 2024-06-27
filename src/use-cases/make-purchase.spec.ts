import { Purchase } from 'src/entities/purchase.entity';
import { beforeEach, describe, expect, it } from 'vitest';
import { AddProductToPurchase } from './add-product-to-purchase.use-case';
import { CreateBuyer } from './create-buyer.use-case';
import { CreateProduct } from './create-product.use-case';
import { MakePurchase } from './make-purchase.use-case';

describe('make-purchase.spec.ts', () => {
  let makePurchase: MakePurchase;
  let createBuyer: CreateBuyer;
  let createProduct: CreateProduct;
  let addProductToPurchase: AddProductToPurchase;

  beforeEach(() => {
    makePurchase = new MakePurchase();
    createBuyer = new CreateBuyer();
    createProduct = new CreateProduct();
    addProductToPurchase = new AddProductToPurchase();
  });

  it('Make a purchase', async () => {
    const mockBuyer = await createBuyer.execute({
      name: 'Natanael Oliveira',
      email: 'natanael@gmail.com',
    });

    const mockProduct = await createProduct.execute({
      name: 'Tapioca',
      price: 3,
    });

    const mockProductToPurchase = await addProductToPurchase.execute({
      count: 2,
      product: mockProduct,
    });

    const purchase = await makePurchase.execute({
      amountPaid: 6,
      amountToPay: 0,
      totalAmount: 6,
      buyer: mockBuyer,
      productsPurchased: [mockProductToPurchase],
    });

    expect(purchase).toBeInstanceOf(Purchase);
    expect(purchase.productsPurchased).toHaveLength(1);
    expect(purchase.productsPurchased[0].product.name).toEqual('Tapioca');
    expect(purchase.productsPurchased[0].product.price).toEqual(3);
    expect(purchase.buyer.name).toEqual('Natanael Oliveira');
  });

  it('The amount paid cannot exceed the purchase price', async () => {
    expect(async () => {
      const mockBuyer = await createBuyer.execute({
        name: 'Natanael Oliveira',
        email: 'natanael@gmail.com',
      });

      const mockProduct = await createProduct.execute({
        name: 'Tapioca',
        price: 3,
      });

      const mockProductToPurchase = await addProductToPurchase.execute({
        count: 2,
        product: mockProduct,
      });

      await makePurchase.execute({
        amountPaid: 999,
        buyer: mockBuyer,
        productsPurchased: [mockProductToPurchase],
      });
    }).rejects.toThrow(
      '"O valor pago" + "valor a pagar" não condiz com o valor real da compra.',
    );
  });

  it('The amount to pay cannot exceed the purchase price', async () => {
    expect(async () => {
      const mockBuyer = await createBuyer.execute({
        name: 'Natanael Oliveira',
        email: 'natanael@gmail.com',
      });

      const mockProduct = await createProduct.execute({
        name: 'Tapioca',
        price: 3,
      });

      const mockProductToPurchase = await addProductToPurchase.execute({
        count: 2,
        product: mockProduct,
      });

      await makePurchase.execute({
        amountPaid: 6,
        amountToPay: 100,
        buyer: mockBuyer,
        productsPurchased: [mockProductToPurchase],
      });
    }).rejects.toThrow(
      '"O valor pago" + "valor a pagar" não condiz com o valor real da compra.',
    );
  });

  it('Purchase calculation must correspond to the purchase price', async () => {
    expect(async () => {
      const mockBuyer = await createBuyer.execute({
        name: 'Natanael Oliveira',
        email: 'natanael@gmail.com',
      });

      const mockProduct = await createProduct.execute({
        name: 'Tapioca',
        price: 3,
      });

      const mockProductToPurchase = await addProductToPurchase.execute({
        count: 2,
        product: mockProduct,
      });

      await makePurchase.execute({
        amountPaid: 1,
        amountToPay: 1,
        buyer: mockBuyer,
        productsPurchased: [mockProductToPurchase],
      });
    }).rejects.toThrow(
      '"O valor pago" + "valor a pagar" não condiz com o valor real da compra.',
    );
  });

  it('The purchase price must correspond to the value of the products purchased', async () => {
    expect(async () => {
      const mockBuyer = await createBuyer.execute({
        name: 'Natanael Oliveira',
        email: 'natanael@gmail.com',
      });

      const mockProduct = await createProduct.execute({
        name: 'Tapioca',
        price: 3,
      });

      const mockProductToPurchase = await addProductToPurchase.execute({
        count: 10,
        product: mockProduct,
      });

      await makePurchase.execute({
        amountPaid: 6,
        totalAmount: 6,
        buyer: mockBuyer,
        productsPurchased: [mockProductToPurchase],
      });
    }).rejects.toThrow(
      'O valor da compra não corresponde ao valor dos produtos comprados.',
    );
  });
});
