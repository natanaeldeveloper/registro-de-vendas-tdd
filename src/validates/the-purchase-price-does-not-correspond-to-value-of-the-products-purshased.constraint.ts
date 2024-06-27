import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MakePurchaseDto } from 'src/dtos/make-purchase.dto';

@ValidatorConstraint({ async: false })
export class ThePurchasePriceDoesNotCorrespondToTheValueOfTheProductsPurchasedConstraint
  implements ValidatorConstraintInterface
{
  validate(value: number, args: ValidationArguments) {
    const props = args.object as MakePurchaseDto;
    return (
      value ===
      props.productsPurchased.reduce(
        (total, item) => item.totalPrice + total,
        0,
      )
    );
  }

  defaultMessage() {
    return 'O valor da compra não corresponde ao valor dos produtos comprados.';
  }
}

export function ThePurchasePriceDoesNotCorrespondToTheValueOfTheProductsPurchased(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator:
        ThePurchasePriceDoesNotCorrespondToTheValueOfTheProductsPurchasedConstraint,
    });
  };
}
