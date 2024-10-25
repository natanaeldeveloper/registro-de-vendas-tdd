import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cashier } from './cashier.entity';

@Entity()
export class Stand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: null })
  color: string;

  @OneToMany(() => Cashier, (cashier) => cashier.stand)
  cashiers: Cashier[];
}
