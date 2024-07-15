import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './product.entity';
import { Purchase } from './purchase.entity';

@Entity()
@Unique(['productId', 'purchaseId'])
export class PurchaseProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 1 })
  count: number;

  @ManyToOne(() => Product, (product) => product.purchaseProducts, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseProducts, {
    onDelete: 'CASCADE',
  })
  purchase: Purchase;
}
