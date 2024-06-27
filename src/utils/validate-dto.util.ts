import { validate } from 'class-validator';

export async function validateDto(dto: object) {
  const validationErrors = await validate(dto);

  if (validationErrors.length > 0) {
    throw new Error(Object.values(validationErrors[0].constraints).join(', '));
  }
}
