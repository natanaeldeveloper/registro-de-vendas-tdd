import { Product } from './product.entity';

export interface ProductPurchasedProps {
  count: number;
  product: Product;
  totalPrice: number;
}

export class ProductPurchased {
  private props: ProductPurchasedProps;

  constructor(props: ProductPurchasedProps) {
    this.props = props;
  }

  get count() {
    return this.props.count;
  }

  get totalPrice() {
    return this.props.totalPrice;
  }

  get product() {
    return this.props.product;
  }
}
