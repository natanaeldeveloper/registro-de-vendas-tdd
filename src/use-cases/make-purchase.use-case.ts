import { Product } from '../entities/product.entity';
import { Sale } from '../entities/sale.entity';
import { Buyer } from '../entities/buyer.entity';

export interface MakePurchaseProps {
  products: Product[];
  buyer: Buyer;
  amountToPay: number;
  amountPaid: number;
}

export type MakePurchaseResponse = Promise<Sale>;

export class MakePurchase {
  async execute(props: MakePurchaseProps): MakePurchaseResponse {
    const { amountPaid, amountToPay, buyer, products } = props;

    const sale = new Sale({
      amountPaid,
      amountToPay,
      buyer,
      products,
    });

    return sale;
  }
}
