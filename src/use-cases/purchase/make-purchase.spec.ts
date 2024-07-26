import { Purchase } from 'src/entities/purchase.entity';
import { BuyerService } from 'src/services/buyer.service';
import { ProductService } from 'src/services/product.service';
import { PurchaseProductService } from 'src/services/purchase-product.service';
import { PurchaseService } from 'src/services/purchase.service';
import { beforeEach, describe, expect, it, Mock } from 'vitest';
import { CreateBuyer } from '../buyer/create-buyer.use-case';
import { CreateProduct } from '../product/create-product.use-case';
import { MakePurchase } from './make-purchase.use-case';
import { ValidationError } from 'class-validator';
import { BuyerRepository } from 'src/repositories/buyer.repository';
import { ProductRepository } from 'src/repositories/product.repository';
import { PurchaseRepository } from 'src/repositories/purchase.repository';
import { PurchaseProductRepository } from 'src/repositories/purchase-product.repository';

describe('make-purchase.spec.ts', () => {
  //declaração de services
  let buyerService: BuyerService;
  let productService: ProductService;
  let purchaseService: PurchaseService;
  let purchaseProductService: PurchaseProductService;

  //declaração de casos de uso
  let createBuyer: CreateBuyer;
  let createProduct: CreateProduct;
  let makePurchase: MakePurchase;

  let buyerRepository: BuyerRepository;
  let productRepository: ProductRepository;
  let purchaseRepository: PurchaseRepository;
  let purchaseProductRepository: PurchaseProductRepository;

  beforeEach(() => {
    buyerService = new BuyerService(buyerRepository);
    productService = new ProductService(productRepository);
    purchaseProductService = new PurchaseProductService(
      purchaseProductRepository,
    );
    purchaseService = new PurchaseService(
      purchaseRepository,
      purchaseProductService,
    );

    createBuyer = new CreateBuyer(buyerService);
    createProduct = new CreateProduct(productService);
    makePurchase = new MakePurchase(
      purchaseService,
      productService,
      buyerService,
    );
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

    const purchase = await makePurchase.execute({
      amountPaid: 2,
      buyerId: mockBuyer.id,
      products: [
        {
          id: mockProduct.id,
          count: 1,
        },
      ],
    });

    expect(purchase).toBeInstanceOf(Purchase);
    expect(purchase.purchaseProducts).toHaveLength(1);
    expect(purchase.purchaseProducts[0].product.name).toEqual('Tapioca');
    expect(purchase.purchaseProducts[0].product.price).toEqual(3);
    expect(purchase.buyer.name).toEqual('Natanael Oliveira');
  });

  it('The amount paid cannot exceed the purchase price', async () => {
    try {
      const mockBuyer = await createBuyer.execute({
        name: 'Natanael Oliveira',
        email: 'natanael@gmail.com',
      });

      const mockProduct = await createProduct.execute({
        name: 'Tapioca',
        price: 3,
      });

      await makePurchase.execute({
        amountPaid: 999, //disparidade
        buyerId: mockBuyer.id,
        products: [
          {
            id: mockProduct.id,
            count: 1,
          },
        ],
      });
    } catch (error) {
      expect(error).toHaveLength(1);
      expect(error[0]).toBeInstanceOf(ValidationError);
      expect(error[0].property).toEqual('totalAmount');
      expect(error[0].constraints).toHaveProperty(
        'PurchaseCalculationDoesNotMatchConstraint',
      );
    }
  });
});
