import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MakePurchaseDto } from 'src/dtos/make-purchase.dto';

@ValidatorConstraint({ async: false })
export class PurchaseCalculationDoesNotMatchConstraint
  implements ValidatorConstraintInterface
{
  validate(value: number, args: ValidationArguments) {
    const props = args.object as MakePurchaseDto;
    return value === props.amountPaid + props.amountToPay;
  }

  defaultMessage() {
    return '"O valor pago" + "valor a pagar" não condiz com o valor real da compra.';
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
