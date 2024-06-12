import { Product } from '../entities/product.entity';

export type CreateProductProps = {
  name: string;
  price: number;
};

export type CreateProductResponse = Product;

export class CreateProduct {
  async execute(props: CreateProductProps): Promise<CreateProductResponse> {
    const { name, price } = props;
    const product = new Product({
      name,
      price,
    });
    return product;
  }
}
