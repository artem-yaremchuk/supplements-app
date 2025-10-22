import { Request } from 'express';
import type { Role } from '../../generated/prisma/enums';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export interface JwtPayload {
  sub: string;
  role: Role;
}
