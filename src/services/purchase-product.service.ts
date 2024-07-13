import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreatePurchaseProductDto } from 'src/dtos/create-purchase-product.dto';
import { PurchaseProduct } from 'src/entities/purchase-product.entity';
import { generateFakeId } from 'src/utils/faker.util';

@Injectable()
export class PurchaseProductService {
  async create(dtoData: CreatePurchaseProductDto): Promise<PurchaseProduct> {
    const dto = new CreatePurchaseProductDto();

    dto.count = dtoData.count;
    dto.product = dtoData.product;

    await validateOrReject(dto);

    const purchaseProduct = new PurchaseProduct({
      ...dto,
      id: generateFakeId(),
    });

    return purchaseProduct;
  }
}
