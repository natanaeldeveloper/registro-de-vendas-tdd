export interface BuyerProps {
  name: string;
  email: string;
}

export class Buyer {
  private props: BuyerProps;

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  constructor(props: BuyerProps) {
    this.props = props;
  }
}
