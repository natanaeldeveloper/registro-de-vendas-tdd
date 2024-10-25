import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBuyerDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value?.trim())
  phone: string;

  @Transform(({ value }) => value?.trim())
  @IsEmail()
  email: string;
}
