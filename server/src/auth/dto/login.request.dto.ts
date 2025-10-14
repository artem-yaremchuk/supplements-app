import { createZodDto } from 'nestjs-zod';
import { loginSchema } from '../schemas/authSchema';

export class LoginRequestDto extends createZodDto(loginSchema) {}
