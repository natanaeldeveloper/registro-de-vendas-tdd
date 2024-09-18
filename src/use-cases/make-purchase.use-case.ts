import { CreatePurchaseProductDto } from '@/dtos/create-purchase-product.dto';
import { CreatePurchaseDto } from '@/dtos/create-purchase.dto';
import { MakePurchaseDto } from '@/dtos/make-purchase.dto';
import { BuyerService } from '@/services/buyer.service';
import { ProductService } from '@/services/product.service';
import { PurchaseProductService } from '@/services/purchase-product.service';
import { PurchaseService } from '@/services/purchase.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MakePurchaseUseCase {
  constructor(
    protected readonly purchaseService: PurchaseService,
    protected readonly productService: ProductService,
    protected readonly buyerService: BuyerService,
    protected readonly purchaseProductService: PurchaseProductService,
  ) {}
  async execute(makePurchaseDto: MakePurchaseDto) {
    //carregando items da base de dados
    const buyer = await this.buyerService.findById(makePurchaseDto.buyerId);

    if (!buyer) {
      throw new HttpException(`Cliente não encotrado.`, HttpStatus.NOT_FOUND);
    }

    const products = await this.productService.findByIds(
      makePurchaseDto.cart.map((item) => item.productId),
    );

    /**
     * percorrendo items do carrinho para adicioná-los
     * a array de produtos da compra
     * */
    const createPurchaseDto = new CreatePurchaseDto();

    createPurchaseDto.buyer = buyer;
    createPurchaseDto.amountPaid = makePurchaseDto.amountPaid;
    createPurchaseDto.products = [];

    for (let cartItem of makePurchaseDto.cart) {
      const product = products.find((item) => item.id === cartItem.productId);

      if (!product) {
        throw new HttpException(
          `Produto de ID "${cartItem.productId}" não encotrado.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const createPurchaseProductDto = new CreatePurchaseProductDto();
      createPurchaseProductDto.count = cartItem.count;
      createPurchaseProductDto.product = product;

      createPurchaseDto.products.push(createPurchaseProductDto);
    }

    /**
     * Persistindo dados da compra
     */
    this.purchaseService.create(createPurchaseDto);
  }
}
