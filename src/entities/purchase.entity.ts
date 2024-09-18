import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Buyer } from './buyer.entity';
import { PurchaseProduct } from './purchase-product.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountToPay: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountPaid: number;

  @OneToMany(
    () => PurchaseProduct,
    (purchaseProduct) => purchaseProduct.purchase,
    { cascade: true },
  )
  purchaseProducts: PurchaseProduct[];

  @ManyToOne(() => Buyer, (buyer) => buyer.purchases)
  buyer: Buyer;
}
