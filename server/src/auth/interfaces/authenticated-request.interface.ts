import { Request } from 'express';
import { Roles } from '../../constants/enums';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export interface JwtPayload {
  sub: string;
  role: Roles;
}
