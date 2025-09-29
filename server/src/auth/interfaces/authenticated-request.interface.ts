import { Request } from 'express';
import type { Role } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export interface JwtPayload {
  sub: string;
  role: Role;
}
