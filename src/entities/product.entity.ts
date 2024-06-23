export interface ProductProps {
  name: string;
  price: number;
}

export class Product {
  private props: ProductProps;

  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }

  constructor(props: ProductProps) {
    this.props = props;
  }
}
