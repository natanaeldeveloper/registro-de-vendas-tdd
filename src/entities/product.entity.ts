export interface ProductProps {
  id: number;
  name: string;
  price: number;
}

export class Product {
  private readonly props: ProductProps;

  constructor(props: ProductProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }

  set id(value: number) {
    this.props.id = value;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set price(value: number) {
    this.props.price = value;
  }
}
