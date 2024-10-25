import { PaymentMethods } from '@/shared/enums';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Stand } from './stand.entity';
import { ProductStock } from './product-stock.entity';

@Entity()
export class Cashier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'date' })
  reference_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  initial_cash: number;

  @Column({ type: 'bool', default: false })
  future_payment: boolean;

  @Column({
    type: 'enum',
    enum: PaymentMethods,
    array: true,
  })
  payment_methods: PaymentMethods[];

  @Column({ type: 'varchar', nullable: true })
  pix_key: string;

  @Column({ type: 'varchar', nullable: true })
  pix_recipient: string;

  @ManyToOne(() => Stand, (stand) => stand.cashiers, { nullable: false })
  stand: Stand;

  @OneToMany(() => ProductStock, (productStock) => productStock.cashier, {
    cascade: true,
  })
  products_stock: ProductStock[];
}
