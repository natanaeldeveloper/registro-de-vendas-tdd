import { Product } from './product.entity';
import { Sale } from './sale.entity';

export class SaleProduct {
  count: number;
  product: Product;
  sale: Sale;
}
