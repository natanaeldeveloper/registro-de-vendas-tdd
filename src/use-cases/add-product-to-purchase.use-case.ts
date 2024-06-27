import { AddProductPurchasedDto } from 'src/dtos/add-product-purchase.dto';
import { ProductPurchased } from 'src/entities/product-purchased.entity';
import { validateDto } from 'src/utils/validate-dto.util';

export type AddProductToPurchaseResponse = ProductPurchased;

export class AddProductToPurchase {
  async execute(
    dtoData: Partial<AddProductPurchasedDto>,
  ): Promise<ProductPurchased> {
    const dto = new AddProductPurchasedDto();
    Object.assign(dto, dtoData);

    if (typeof dto.totalPrice == 'undefined') {
      dto.totalPrice = dto.product.price * dto.count;
    }

    await validateDto(dto);

    const productPurchased = new ProductPurchased(dto);

    return productPurchased;
  }
}
