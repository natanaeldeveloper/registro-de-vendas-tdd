// import { ValidationError } from 'class-validator';
// import { ProductService } from 'src/services/product.service';
// import { beforeEach, describe, expect, it, vitest } from 'vitest';
// import { CreateProductUseCase } from './create-product.use-case';
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Product } from '@/entities/product.entity';

// export const mockRepository = {
//   find: vitest.fn(),
//   findOneBy: vitest.fn(),
//   save: vitest.fn(),
//   delete: vitest.fn(),
// };

// describe('create-product.spec.ts', () => {
//   let createProductUseCase: CreateProductUseCase;
//   let productService: ProductService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CreateProductUseCase,
//         ProductService,
//         {
//           provide: getRepositoryToken(Product),
//           useValue: mockRepository,
//         },
//       ],
//     }).compile();

//     createProductUseCase =
//       module.get<CreateProductUseCase>(CreateProductUseCase);
//     productService = module.get<ProductService>(ProductService);
//   });

//   it('Create a product', async () => {
//     const productCreated = await createProductUseCase.execute({
//       name: 'Tapioca',
//       price: 3.0,
//     });

//     const product = await productService.findById(productCreated.id);

//     expect(product).not.toBeNull();
//     expect(product.name).toEqual('Tapioca');
//     expect(product.price).toEqual(3.0);
//   });

//   it('Validate empty name field', async () => {
//     try {
//       await createProductUseCase.execute({
//         name: '',
//         price: 3,
//       });
//     } catch (error) {
//       expect(error).toHaveLength(1);
//       expect(error[0]).toBeInstanceOf(ValidationError);
//       expect(error[0].property).toEqual('name');
//       expect(error[0].constraints).toHaveProperty('isNotEmpty');
//     }
//   });

//   it('Validate empty price', async () => {
//     try {
//       await createProductUseCase.execute({
//         name: 'Bolo de morango',
//         price: null,
//       });
//     } catch (error) {
//       expect(error).toHaveLength(1);
//       expect(error[0]).toBeInstanceOf(ValidationError);
//       expect(error[0].property).toEqual('price');
//       expect(error[0].constraints).toHaveProperty('isNotEmpty');
//     }
//   });

//   it('Validate negative price', async () => {
//     try {
//       await createProductUseCase.execute({
//         name: 'Bolo de morango',
//         price: -1,
//       });
//     } catch (error) {
//       expect(error).toHaveLength(1);
//       expect(error[0]).toBeInstanceOf(ValidationError);
//       expect(error[0].property).toEqual('price');
//       expect(error[0].constraints).toHaveProperty('min');
//     }
//   });
// });
