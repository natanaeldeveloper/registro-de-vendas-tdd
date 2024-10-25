import { CreateCashierDto } from '@/dtos/create-cashier.dto';
import { Cashier } from '@/entities/cashier.entity';
import { ProductStock } from '@/entities/product-stock.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from './product.service';
import { StandService } from './stand.service';

@Injectable()
export class CashierService {
  constructor(
    @InjectRepository(Cashier)
    protected readonly cashierRepository: Repository<Cashier>,
    protected readonly standService: StandService,
    protected readonly productService: ProductService,
  ) {}

  async create(dto: CreateCashierDto) {
    const stand = await this.standService.findById(dto.stand_id);

    if (!stand) {
      throw new BadRequestException('Banca de vendas não encontrada.');
    }

    const cashier = new Cashier();

    cashier.stand = stand;
    cashier.name = dto.name;
    cashier.pix_key = dto.pix_key;
    cashier.initial_cash = dto.initial_cash;
    cashier.pix_recipient = dto.pix_recipient;
    cashier.future_payment = dto.future_payment;
    cashier.reference_date = dto.reference_date;
    cashier.payment_methods = dto.payment_methods;
    cashier.products_stock = [];

    const products = await this.productService.findByIds(
      dto.products_stock.map((item) => item.product_id),
    );

    dto.products_stock.forEach((item) => {
      const productStock = new ProductStock();
      productStock.count = item.count;
      const findedProduct = products.find(
        (product) => product.id == item.product_id,
      );

      if (!findedProduct) {
        throw new BadRequestException(
          `Produto de ID: ${item.product_id} não foi encontrado.`,
        );
      }

      productStock.product = findedProduct;
      cashier.products_stock.push(productStock);
    });

    return this.cashierRepository.save(cashier);
  }

  getAll() {
    return this.cashierRepository.find();
  }
}
