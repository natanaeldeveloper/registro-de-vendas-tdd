import { Buyer } from './buyer.entity';
import { PurchaseProduct } from './purchase-product.entity';

export interface PurchaseProps {
  id: number;
  purchaseProducts: PurchaseProduct[];
  buyer: Buyer;
  totalAmount: number;
  amountToPay: number;
  amountPaid: number;
}

export class Purchase {
  id: number;

  purchaseProducts: PurchaseProduct[];

  buyer: Buyer;

  totalAmount: number;

  amountToPay: number;

  amountPaid: number;

  constructor(props: PurchaseProps) {
    this.id = props.id;
    this.purchaseProducts = props.purchaseProducts;
    this.buyer = props.buyer;
    this.totalAmount = props.totalAmount;
    this.amountToPay = props.amountToPay;
    this.amountPaid = props.amountPaid;
  }
}
