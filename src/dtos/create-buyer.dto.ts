import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBuyerDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'O campo primeiro nome deve ser informado.' })
  firstName: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: 'O campo último nome deve ser informado.' })
  lastName: string;

  @IsNotEmpty({ message: 'O campo email deve ser informado.' })
  @IsEmail({}, { message: 'O campo email deve ser do tipo email.' })
  email: string;
}
