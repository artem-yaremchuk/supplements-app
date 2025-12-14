import { Request } from 'express';
import { Injectable, ExecutionContext, CanActivate, createParamDecorator } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlOptionalAuthRequest, JwtPayload } from './interfaces/authenticated-request.interface';

export const GqlUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload | null => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<{ req: GqlOptionalAuthRequest }>();
    return req.gqlUser;
  },
);

@Injectable()
export class GqlOptionalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<{ req: GqlOptionalAuthRequest }>();

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      req.gqlUser = null;
      return true;
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { token: true },
      });

      if (!user || user.token !== token) {
        req.gqlUser = null;
        return true;
      }

      req['gqlUser'] = payload;
    } catch {
      req.gqlUser = null;
    }

    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
