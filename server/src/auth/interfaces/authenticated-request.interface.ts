import { Request } from 'express';
import { Roles } from '../../constants/enums';

export interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    role: Roles;
  };
}
