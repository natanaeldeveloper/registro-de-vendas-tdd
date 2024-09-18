import { validate, ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export async function validateDto<T>(dto: T): Promise<void> {
  const errors: ValidationError[] = await validate(dto as any);

  if (errors.length > 0) {
    const formattedErrors = errors.flatMap((err) =>
      Object.values(err.constraints || {}),
    );

    throw new BadRequestException(formattedErrors);
  }
}
