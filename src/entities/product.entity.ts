export interface ProductProps {
  id: number;
  name: string;
  price: number;
}

export class Product {
  id: number;

  name: string;

  price: number;

  constructor({ id, name, price }: ProductProps) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
