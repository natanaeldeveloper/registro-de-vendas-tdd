// import { Product } from 'src/entities/product.entity';
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { ProductService } from 'src/services/product.service';
// import { beforeEach, describe, expect, it, vitest } from 'vitest';
// import { CreateProductUseCase } from './create-product.use-case';

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
//           useValue: {
//             find: vitest.fn(),
//             findOneBy: vitest.fn(),
//             create: (params: any) => params,
//             save: vitest.fn(),
//             delete: vitest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     productService = module.get<ProductService>(ProductService);
//     createProductUseCase =
//       module.get<CreateProductUseCase>(CreateProductUseCase);
//   });

//   it('Should be defined', async () => {
//     expect(createProductUseCase).toBeDefined();
//     expect(productService).toBeDefined();
//   });

//   it('Create a product', async () => {
//     const productCreated = await createProductUseCase.execute({
//       name: 'Tapioca',
//       price: 3.0,
//     });

//     expect(productCreated.name).toBe('Tapioca');
//   });

//   // const product = await productService.findById(productCreated.id);

//   // expect(product).not.toBeNull();
//   // expect(product.name).toEqual('Tapioca');
//   // expect(product.price).toEqual(3.0);
//   //   });

//   //   it('Validate empty name field', async () => {
//   //     try {
//   //       await createProductUseCase.execute({
//   //         name: '',
//   //         price: 3,
//   //       });
//   //     } catch (error) {
//   //       expect(error).toHaveLength(1);
//   //       expect(error[0]).toBeInstanceOf(ValidationError);
//   //       expect(error[0].property).toEqual('name');
//   //       expect(error[0].constraints).toHaveProperty('isNotEmpty');
//   //     }
//   //   });

//   //   it('Validate empty price', async () => {
//   //     try {
//   //       await createProductUseCase.execute({
//   //         name: 'Bolo de morango',
//   //         price: null,
//   //       });
//   //     } catch (error) {
//   //       expect(error).toHaveLength(1);
//   //       expect(error[0]).toBeInstanceOf(ValidationError);
//   //       expect(error[0].property).toEqual('price');
//   //       expect(error[0].constraints).toHaveProperty('isNotEmpty');
//   //     }
//   //   });

//   //   it('Validate negative price', async () => {
//   //     try {
//   //       await createProductUseCase.execute({
//   //         name: 'Bolo de morango',
//   //         price: -1,
//   //       });
//   //     } catch (error) {
//   //       expect(error).toHaveLength(1);
//   //       expect(error[0]).toBeInstanceOf(ValidationError);
//   //       expect(error[0].property).toEqual('price');
//   //       expect(error[0].constraints).toHaveProperty('min');
//   //     }
//   //   });
// });
