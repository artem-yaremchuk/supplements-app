import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import type { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';
import { OptionalAuthGuard } from './optional-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { GqlOptionalAuthGuard } from './gql-optional-auth.guard';
import { MetricsAuthGuard } from './metrics-auth.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.getOrThrow<StringValue>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
    RolesGuard,
    OptionalAuthGuard,
    GoogleStrategy,
    GqlOptionalAuthGuard,
    MetricsAuthGuard,
  ],
  exports: [AuthGuard, RolesGuard, OptionalAuthGuard, GqlOptionalAuthGuard, MetricsAuthGuard],
})
export class AuthModule {}
