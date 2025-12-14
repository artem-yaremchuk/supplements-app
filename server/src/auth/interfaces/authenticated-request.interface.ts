import { Request } from 'express';
import type { Role } from '../../generated/prisma/enums';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export interface JwtPayload {
  sub: string;
  role: Role;
}

export interface OptionalAuthRequest extends Request {
  authUser: JwtPayload | null;
}

export interface GoogleCallbackRequest extends Request {
  user: {
    googleAuthCode: string;
  };
}

export interface GqlOptionalAuthRequest extends Request {
  gqlUser: JwtPayload | null;
}
