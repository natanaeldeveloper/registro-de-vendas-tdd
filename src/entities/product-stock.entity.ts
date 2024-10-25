import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Cashier } from './cashier.entity';

@Entity()
export class ProductStock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productsStock, {
    nullable: false,
  })
  product: Product;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => Cashier, (cashier) => cashier.products_stock)
  cashier: Cashier;
}
