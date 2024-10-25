import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Buyer } from './buyer.entity';
import { SalePayment } from './sale-payment.entity';
import { SaleProduct } from './sale-product.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'decimal', precision: 10, scale: 2 })
  // total_amount: number;

  // @Column({ type: 'decimal', precision: 10, scale: 2 })
  // amount_to_pay: number;

  // @Column({ type: 'decimal', precision: 10, scale: 2 })
  // amount_paid: number;

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.sale, {
    cascade: true,
  })
  sale_products: SaleProduct[];

  @ManyToOne(() => Buyer, (buyer) => buyer.sale, {
    nullable: false,
    cascade: true,
  })
  buyer: Buyer;

  @OneToMany(() => SalePayment, (salePayment) => salePayment.sale, {
    cascade: true,
  })
  sale_payments: SalePayment[];
}
