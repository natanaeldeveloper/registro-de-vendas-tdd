import { PaymentMethods } from '@/shared/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sale } from './sale.entity';

@Entity()
export class SalePayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({
    type: 'enum',
    enum: PaymentMethods,
  })
  payment_method: PaymentMethods;

  @ManyToOne(() => Sale, (sale) => sale.sale_payments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  sale: Sale;
}
