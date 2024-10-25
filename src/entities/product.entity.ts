import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PurchaseProduct } from './purchase-product.entity';
import { ProductStock } from './product-stock.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(
    () => PurchaseProduct,
    (purchaseProduct) => purchaseProduct.product,
  )
  purchaseProducts: PurchaseProduct[];

  @OneToMany(() => ProductStock, (productStock) => productStock.product)
  productsStock: ProductStock[];
}
