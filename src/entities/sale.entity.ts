import { Buyer } from './buyer.entity';
import { Product } from './product.entity';

export interface SaleProps {
  products: Product[];
  buyer: Buyer;
  amountToPay: number;
  amountPaid: number;
}

export class Sale {
  private props: SaleProps;

  get products() {
    return this.props.products;
  }

  get buyer() {
    return this.props.buyer;
  }

  get amountToPay() {
    return this.props.amountToPay;
  }

  get amountPaid() {
    return this.props.amountPaid;
  }

  constructor(props: SaleProps) {
    this.props = props;
  }
}
