import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateStandDto {
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value?.trim())
  color: string;
}
