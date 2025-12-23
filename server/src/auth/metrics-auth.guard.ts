import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class MetricsAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();

    const auth = req.headers.authorization;

    if (!auth || auth !== `Bearer ${this.configService.getOrThrow('GRAFANA_METRICS_TOKEN')}`) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
