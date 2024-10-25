import { CreateSaleDto } from '@/dtos/create-sale/create-sale.dto';
import { Buyer } from '@/entities/buyer.entity';
import { SalePayment } from '@/entities/sale-payment.entity';
import { SaleProduct } from '@/entities/sale-product.entity';
import { Sale } from '@/entities/sale.entity';
import { validateDto } from '@/utils/validate-dto.util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from './product.service';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    protected readonly saleRepository: Repository<Sale>,
    protected readonly productService: ProductService,
  ) {}

  async create(dto: CreateSaleDto) {
    await validateDto(dto);

    const sale = new Sale();

    sale.sale_products = [];

    const products = await this.productService.findByIds(
      dto.sale_products.map((item) => item.product_id),
    );

    dto.sale_products.forEach((item) => {
      const saleProduct = new SaleProduct();
      saleProduct.count = item.count;
      const findedProduct = products.find(
        (product) => product.id === item.product_id,
      );

      if (!findedProduct) {
        throw new BadRequestException(
          `Produto de ID: ${item.product_id} não foi encontrado.`,
        );
      }

      saleProduct.product = findedProduct;
      sale.sale_products.push(saleProduct);
    });

    const buyer = new Buyer();

    buyer.name = dto.buyer.name;
    buyer.email = dto.buyer.email;
    buyer.phone = dto.buyer.phone;

    sale.buyer = buyer;
    sale.sale_payments = [];

    dto.payments.map((item) => {
      const payment = new SalePayment();
      payment.payment_method = item.payment_method;
      payment.value = item.value;
      sale.sale_payments.push(payment);
    });

    return this.saleRepository.save(sale);
  }

  async findById(id: number) {
    return this.saleRepository.findOneBy({ id });
  }
}
