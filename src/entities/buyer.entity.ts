export interface BuyerProps {
  id: number;
  name: string;
  email: string;
}

export class Buyer {
  id: number;

  name: string;

  email: string;

  constructor({ id, name, email }: BuyerProps) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
