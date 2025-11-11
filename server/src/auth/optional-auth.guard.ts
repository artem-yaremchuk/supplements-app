import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { OptionalAuthRequest } from './interfaces/authenticated-request.interface';

@Injectable()
export class OptionalAuthGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: OptionalAuthRequest = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      request.user = null;
      return true;
    }

    try {
      await super.canActivate(context);
    } catch {
      request.user = null;
    }

    return true;
  }
}
