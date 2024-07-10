export interface BuyerProps {
  id: number;
  name: string;
  email: string;
}

export class Buyer {
  private readonly props: BuyerProps;

  constructor(props: BuyerProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  set id(value: number) {
    this.props.id = value;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set email(value: string) {
    this.props.email = value;
  }
}
