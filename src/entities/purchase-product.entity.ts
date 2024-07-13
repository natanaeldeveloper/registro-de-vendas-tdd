import { Product } from './product.entity';

export interface PurchaseProductProps {
  id: number;
  count: number;
  product: Product;
}

export class PurchaseProduct {
  id: number;

  count: number;

  product: Product;

  constructor({ id, count, product }: PurchaseProductProps) {
    this.id = id;
    this.count = count;
    this.product = product;
  }
}
