import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O campo nome deve ser informado.' })
  name: string;

  @IsNotEmpty({ message: 'O campo preço deve ser informado.' })
  @IsNumber({}, { message: 'O campo preço deve ser um número.' })
  @Min(0, { message: 'O preço não pode ser negativo.' })
  price: number;
}
