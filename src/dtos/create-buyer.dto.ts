import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBuyerDto {
  @IsNotEmpty({ message: 'O campo nome deve ser informado.' })
  name: string;
  @IsNotEmpty({ message: 'O campo email deve ser informado.' })
  @IsEmail({}, { message: 'O campo email deve ser do tipo email.' })
  email: string;
}
