import { createZodDto } from 'nestjs-zod';
import { registerSchema } from '../schemas/authSchema';

export class RegisterRequestDto extends createZodDto(registerSchema) {}
