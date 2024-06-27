import { Buyer } from './buyer.entity';
import { ProductPurchased } from './product-purchased.entity';

export interface PurchaseProps {
  productsPurchased: ProductPurchased[];
  buyer: Buyer;
  totalAmount: number;
  amountToPay: number;
  amountPaid: number;
}

export class Purchase {
  private props: PurchaseProps;

  get productsPurchased() {
    return this.props.productsPurchased;
  }

  get buyer() {
    return this.props.buyer;
  }

  get totalAmount() {
    return this.props.totalAmount;
  }

  get amountToPay() {
    return this.props.amountToPay;
  }

  get amountPaid() {
    return this.props.amountPaid;
  }

  constructor(props: PurchaseProps) {
    this.props = props;
  }
}
