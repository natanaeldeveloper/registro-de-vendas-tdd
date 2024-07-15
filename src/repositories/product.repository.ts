import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

export class ProductRepository extends Repository<Product> {}
