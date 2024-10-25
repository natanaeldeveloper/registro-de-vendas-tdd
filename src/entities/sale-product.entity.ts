import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './product.entity';
import { Sale } from './sale.entity';

@Entity()
@Unique(['product', 'sale'])
export class SaleProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 1 })
  count: number;

  @ManyToOne(() => Product, (product) => product.sale_products, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  product: Product;

  @ManyToOne(() => Sale, (sale) => sale.sale_products, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  sale: Sale;
}
