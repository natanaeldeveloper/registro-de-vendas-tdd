import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreatePurchaseDto } from 'src/dtos/create-purchase.dto';

@ValidatorConstraint({ async: false })
export class PurchaseCalculationDoesNotMatchConstraint
  implements ValidatorConstraintInterface
{
  validate(value: number, args: ValidationArguments) {
    const props = args.object as CreatePurchaseDto;
    return value === props.amountPaid + props.amountToPay;
  }

  defaultMessage() {
    return 'Há inconsistências entre o "valor a pagar", "valor pago" e "total da compra"';
  }
}

export function PurchaseCalculationDoesNotMatch(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PurchaseCalculationDoesNotMatchConstraint,
    });
  };
}
