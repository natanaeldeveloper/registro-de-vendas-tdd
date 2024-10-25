import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStock } from './product-stock.entity';
import { SaleProduct } from './sale-product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.product)
  sale_products: SaleProduct[];

  @OneToMany(() => ProductStock, (productStock) => productStock.product)
  products_stock: ProductStock[];
}
