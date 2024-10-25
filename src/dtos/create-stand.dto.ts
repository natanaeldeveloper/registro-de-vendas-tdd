import { IsNotEmpty } from 'class-validator';

export class CreateStandDto {
  @IsNotEmpty()
  name: string;

  color: string;
}
